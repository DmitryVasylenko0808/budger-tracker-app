import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { EmailService } from 'src/email/email.service';
import { UsersService } from 'src/users/users.service';

import { ConfirmationTokensService } from '../confirmation-tokens/confirmation.tokens.service';
import { ChangePasswordDto } from './dto/change.password.dto';
import { ResetPasswordDto } from './dto/reset.password.dto';

@Injectable()
export class PasswordRecoveryService {
  constructor(
    private readonly usersService: UsersService,
    private readonly confirmationTokensService: ConfirmationTokensService,
    private readonly emailService: EmailService
  ) {}

  async resetPassword(data: ResetPasswordDto) {
    const { email } = data;

    const existedUser = await this.usersService.getByEmail(email);

    if (!existedUser || !existedUser.passwordHash) {
      throw new NotFoundException('User is not found');
    }

    await this.confirmationTokensService.deleteTokens(email, 'RESET_PASSWORD');

    const token = await this.confirmationTokensService.generateToken({
      email,
      type: 'RESET_PASSWORD',
    });

    await this.emailService.sendEmailChangePasswordLink(
      existedUser.email,
      existedUser.name,
      token.value
    );
  }

  async changePassword(data: ChangePasswordDto) {
    const { password, token } = data;

    const verifiedToken = await this.confirmationTokensService.verify(token, 'RESET_PASSWORD');

    if (!verifiedToken) {
      throw new BadRequestException('Token is invalid or expired');
    }

    const user = await this.usersService.getByEmail(verifiedToken.email);

    if (!user || !user.passwordHash) {
      throw new NotFoundException('User is not found');
    }

    await this.usersService.changePassword(user.id, password);
    await this.confirmationTokensService.deleteTokens(user.email, 'RESET_PASSWORD');
  }
}

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ChangePasswordDto } from './dto/change.password.dto';
import { ResetPasswordDto } from './dto/reset.password.dto';
import { UsersService } from 'src/users/users.service';
import { EmailService } from 'src/email/email.service';
import { ConfirmationTokensService } from '../confirmation-tokens/confirmation.tokens.service';

@Injectable()
export class PasswordRecoveryService {
  constructor(
    private readonly usersService: UsersService,
    private readonly confirmationTokensService: ConfirmationTokensService,
    private readonly emailService: EmailService,
  ) {}

  async resetPassword(data: ResetPasswordDto) {
    const { email } = data;

    const existedUser = await this.usersService.getByEmail(email);

    if (!existedUser || !existedUser.passwordHash) {
      throw new NotFoundException('User is not found');
    }

    await this.confirmationTokensService.deleteTokens(email, 'RESET_PASSWORD');

    const token = await this.confirmationTokensService.generateToken(
      email,
      'RESET_PASSWORD',
    );

    await this.emailService.sendEmailChangePasswordLink(
      existedUser.email,
      existedUser.name,
      token.value,
    );
  }

  async changePassword(data: ChangePasswordDto) {
    const { password, token } = data;

    const existedToken = await this.confirmationTokensService.findToken(
      token,
      'RESET_PASSWORD',
    );

    if (!existedToken) {
      throw new NotFoundException("This token doesn't exist");
    }

    const isExpired = existedToken.expiresAt < new Date();

    if (isExpired) {
      throw new BadRequestException('This token is expired');
    }

    const user = await this.usersService.getByEmail(existedToken.email);

    if (!user || !user.passwordHash) {
      throw new NotFoundException('User is not found');
    }

    await this.usersService.changePassword(user.id, password);
    await this.confirmationTokensService.deleteTokens(
      user.email,
      'RESET_PASSWORD',
    );
  }
}

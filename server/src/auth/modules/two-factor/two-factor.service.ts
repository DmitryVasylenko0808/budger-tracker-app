import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { EmailService } from 'src/email/email.service';
import { UsersService } from 'src/users/users.service';

import { AccessTokensService } from '../access-tokens/access-tokens.service';
import { ConfirmationTokensService } from '../confirmation-tokens/confirmation.tokens.service';
import { ResendTwoFaCodeDto } from './dto/resend-two-code.dto';
import { ToggleVerifyDto } from './dto/toggle-verify.dto';
import { TwoFactorVerifyDto } from './dto/two-factor-verify.dto';

@Injectable()
export class TwoFactorService {
  constructor(
    private readonly usersService: UsersService,
    private readonly confirmationTokensService: ConfirmationTokensService,
    private readonly emailService: EmailService,
    private readonly accessTokensService: AccessTokensService
  ) {}

  async sendTwoFaCode(email: string, name: string) {
    await this.confirmationTokensService.deleteTokens(email, 'TWO_FA');

    const code = await this.confirmationTokensService.generateToken({
      email: email,
      type: 'TWO_FA',
      variant: 'code',
      expiresIn: 1000 * 60 * 5,
    });

    await this.emailService.sendEmailVerificationCode(email, name, code.value);
  }

  async resendTwoFaCode(resendTwoFaCodeDto: ResendTwoFaCodeDto) {
    const user = await this.usersService.getByEmail(resendTwoFaCodeDto.email);

    if (!user) {
      throw new NotFoundException('User is not found');
    }

    await this.sendTwoFaCode(user.email, user.name);
  }

  async toggle(userId: number) {
    const user = await this.usersService.getByIdOrThrow(userId);

    await this.sendTwoFaCode(user.email, user.name);
  }

  async toggleVerify(toggleVerifyDto: ToggleVerifyDto, userId: number) {
    const { code } = toggleVerifyDto;

    const verifiedToken = await this.confirmationTokensService.verify(code, 'TWO_FA');

    if (!verifiedToken) {
      throw new BadRequestException('Token is invalid or expired');
    }

    const user = await this.usersService.getByIdOrThrow(userId);
    const updatedUser = await this.usersService.toggleTwoFa(user.id, user.twoFa);

    await this.confirmationTokensService.deleteTokens(user.email, 'TWO_FA');

    return updatedUser;
  }

  async verify(twoFactorVerifyDto: TwoFactorVerifyDto) {
    const { code } = twoFactorVerifyDto;

    const verifiedCode = await this.confirmationTokensService.verify(code, 'TWO_FA');

    if (!verifiedCode) {
      throw new BadRequestException('Token is invalid or expired');
    }

    const user = await this.usersService.getByEmail(verifiedCode.email);

    if (!user) {
      throw new NotFoundException('User is not found');
    }

    await this.confirmationTokensService.deleteTokens(user.email, 'TWO_FA');

    const accessToken = await this.accessTokensService.genererate(user);

    return accessToken;
  }
}

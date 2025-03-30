import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { EmailService } from 'src/email/email.service';
import { UsersService } from 'src/users/users.service';

import { ConfirmationTokensService } from '../confirmation-tokens/confirmation.tokens.service';

@Injectable()
export class EmailConfirmationService {
  constructor(
    private readonly confirmationTokensService: ConfirmationTokensService,
    private readonly emailService: EmailService,
    private readonly usersService: UsersService
  ) {}

  async sendLink(email: string) {
    const user = await this.usersService.getByEmail(email);

    if (!user) {
      throw new NotFoundException('User is not found');
    }

    await this.confirmationTokensService.deleteTokens(user.email, 'EMAIL_CONFIRMATION');

    const token = await this.confirmationTokensService.generateToken({
      email: user.email,
      type: 'EMAIL_CONFIRMATION',
    });

    await this.emailService.sendEmailConfirmationLink(user.email, user.name, token.value);
  }

  async confirmEmail(token: string) {
    const verifiedToken = await this.confirmationTokensService.verify(token, 'EMAIL_CONFIRMATION');

    if (!verifiedToken) {
      throw new BadRequestException('Invalid token or expired');
    }

    const user = await this.usersService.getByEmail(verifiedToken.email);

    if (!user) {
      throw new NotFoundException('User is not found');
    }

    const verifiedUser = await this.usersService.markAsVerified(user.id);

    await this.confirmationTokensService.deleteTokens(verifiedToken.email, 'EMAIL_CONFIRMATION');

    return verifiedUser;
  }
}

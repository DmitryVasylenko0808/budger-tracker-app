import { ResendService } from 'nestjs-resend';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  constructor(
    private readonly configService: ConfigService,
    private readonly resendService: ResendService
  ) {}

  async sendEmailConfirmationLink(email: string, name: string, code: string) {
    const href = `${this.configService.get('CLIENT_CONFIRMATION_EMAIL_URL')}?token=${code}`;

    await this.resendService.send({
      from: 'budget-tracker@resend.dev',
      to: email,
      subject: 'Email Confirmation',
      html: `
        <p>Hello, ${name}!</p> 

        <a href=${href}>Here is your link for email confirmation</a>

        <p>This code will expire in 1 hour.</p>
        `,
    });
  }

  async sendEmailChangePasswordLink(email: string, name: string, token: string) {
    const href = `${this.configService.get('CLIENT_CHANGE_PASSWORD_URL')}?token=${token}`;

    await this.resendService.send({
      from: 'budget-tracker@resend.dev',
      to: email,
      subject: 'Reset Password',
      html: `
        <p>Hello, ${name}!</p> 

        <a href=${href}>Here is your link for changing your password</a>

        <p>This code will expire in 1 hour.</p>
        `,
    });
  }

  async sendEmailVerificationCode(email: string, name: string, code: string) {
    await this.resendService.send({
      from: 'budget-tracker@resend.dev',
      to: email,
      subject: 'Verification 2FA',
      html: `
        <p>Hello, ${name}!</p> 

        <p>Here is your code: ${code}</p>

        <p>This code will expire in 5 minutes.</p>
        `,
    });
  }
}

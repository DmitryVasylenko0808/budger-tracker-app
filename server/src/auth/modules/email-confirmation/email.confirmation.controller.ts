import { Body, Controller, Post } from '@nestjs/common';
import { ConfirmEmailDto } from './dto/confirm.email.dto';
import { ResendConfirmDto } from './dto/resend.confirm.dto';
import { EmailConfirmationService } from './email.confirmation.service';

@Controller('auth/email-confirmation')
export class EmailConfirmationController {
  constructor(
    private readonly emailConfirmationService: EmailConfirmationService,
  ) {}

  @Post('confirm')
  async confirmUserEmail(@Body() confirmEmailDto: ConfirmEmailDto) {
    return await this.emailConfirmationService.confirmEmail(
      confirmEmailDto.token,
    );
  }

  @Post('resend')
  async resendConfirmationEmail(@Body() resendConfirmDto: ResendConfirmDto) {
    return await this.emailConfirmationService.sendLink(resendConfirmDto.email);
  }
}

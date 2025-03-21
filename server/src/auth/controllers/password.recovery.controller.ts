import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { PasswordRecoveryService } from '../services/password.recovery.service';
import { ResetPasswordDto } from '../dto/reset.password.dto';
import { ChangePasswordDto } from '../dto/change.password.dto';

@Controller('auth/password-recovery')
export class PasswordRecoveryController {
  constructor(
    private readonly passwordRecoveryService: PasswordRecoveryService,
  ) {}

  @Post('reset')
  @HttpCode(HttpStatus.OK)
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return await this.passwordRecoveryService.resetPassword(resetPasswordDto);
  }

  @Post('change-password')
  @HttpCode(HttpStatus.OK)
  async changePassword(@Body() changePasswordDto: ChangePasswordDto) {
    return await this.passwordRecoveryService.changePassword(changePasswordDto);
  }
}

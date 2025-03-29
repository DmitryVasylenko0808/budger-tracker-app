import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';

import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

import { TokenPayload } from '../access-tokens/types/token.payload';
import { ResendTwoFaCodeDto } from './dto/resend-two-code.dto';
import { ToggleVerifyDto } from './dto/toggle-verify.dto';
import { TwoFactorVerifyDto } from './dto/two-factor-verify.dto';
import { TwoFactorService } from './two-factor.service';

@Controller('auth/two-factor')
export class TwoFactorController {
  constructor(private readonly twoFactorService: TwoFactorService) {}

  @Post('toggle')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async toggle(@CurrentUser() user: TokenPayload) {
    return await this.twoFactorService.toggle(user.userId);
  }

  @Post('toggle/verify')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async toggleVerify(@Body() toggleVerifyDto: ToggleVerifyDto, @CurrentUser() user: TokenPayload) {
    return await this.twoFactorService.toggleVerify(toggleVerifyDto, user.userId);
  }

  @Post('verify')
  @HttpCode(HttpStatus.OK)
  async verify(@Body() twoFactorVerifyDto: TwoFactorVerifyDto) {
    return await this.twoFactorService.verify(twoFactorVerifyDto);
  }

  @Post('resend-code')
  @HttpCode(HttpStatus.OK)
  async resendCode(@Body() resendTwoFaCodeDto: ResendTwoFaCodeDto) {
    return await this.twoFactorService.resendTwoFaCode(resendTwoFaCodeDto);
  }
}

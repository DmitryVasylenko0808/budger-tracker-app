import { User } from '@prisma/client';

import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';

import { CurrentUser } from '../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign.up.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { VerifiedUserGuard } from './guards/verified-user.guard';
import { AccessTokensService } from './modules/access-tokens/access-tokens.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly accessTokensService: AccessTokensService
  ) {}

  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Post('sign-in')
  @UseGuards(LocalAuthGuard, VerifiedUserGuard)
  @HttpCode(HttpStatus.OK)
  async signIn(@CurrentUser() user: User) {
    return await this.accessTokensService.genererate(user);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMe(@CurrentUser() user: User) {
    return user;
  }
}

import { Controller, Get, UseGuards } from '@nestjs/common';
import { GoogleOuathGuard } from './google-oauth.guard';
import { CurrentUser } from 'src/auth/decorators';
import { User } from '@prisma/client';
import { AccessTokensService } from '../access-tokens/access-tokens.service';

@Controller('auth/google')
export class GoogleOauthController {
  constructor(private readonly accessTokensService: AccessTokensService) {}

  @Get()
  @UseGuards(GoogleOuathGuard)
  async googleAuth() {}

  @Get('redirect')
  @UseGuards(GoogleOuathGuard)
  async googleAuthRedirec(@CurrentUser() user: User) {
    return await this.accessTokensService.genererate(user);
  }
}

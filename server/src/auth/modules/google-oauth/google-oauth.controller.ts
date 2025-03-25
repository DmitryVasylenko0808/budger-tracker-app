import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { GoogleOuathGuard } from './google-oauth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { User } from '@prisma/client';
import { AccessTokensService } from '../access-tokens/access-tokens.service';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Controller('auth/google')
export class GoogleOauthController {
  constructor(
    private readonly accessTokensService: AccessTokensService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  @UseGuards(GoogleOuathGuard)
  async googleAuth() {}

  @Get('redirect')
  @UseGuards(GoogleOuathGuard)
  async googleAuthRedirect(@CurrentUser() user: User, @Res() res: Response) {
    const { access_token } = await this.accessTokensService.genererate(user);

    return res.redirect(
      `${this.configService.get<string>('CLIENT_LOGIN_URL')}?token=${access_token}`,
    );
  }
}

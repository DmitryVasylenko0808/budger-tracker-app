import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { GithubOauthGuard } from './github-oauth.guard';
import { AccessTokensService } from '../access-tokens/access-tokens.service';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { User } from '@prisma/client';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Controller('auth/github')
export class GithubOauthController {
  constructor(
    private readonly accessTokensService: AccessTokensService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  @UseGuards(GithubOauthGuard)
  async githubAuth() {}

  @Get('redirect')
  @UseGuards(GithubOauthGuard)
  async githubAuthRedirect(@CurrentUser() user: User, @Res() res: Response) {
    const { access_token } = await this.accessTokensService.genererate(user);

    return res.redirect(
      `${this.configService.get<string>('CLIENT_LOGIN_URL')}?token=${access_token}`,
    );
  }
}

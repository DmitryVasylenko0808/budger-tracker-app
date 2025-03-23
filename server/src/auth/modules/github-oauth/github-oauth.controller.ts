import { Controller, Get, UseGuards } from '@nestjs/common';
import { GithubOauthGuard } from './github-oauth.guard';
import { AccessTokensService } from '../access-tokens/access-tokens.service';
import { CurrentUser } from 'src/auth/decorators';
import { User } from '@prisma/client';

@Controller('auth/github')
export class GithubOauthController {
  constructor(private readonly accessTokensService: AccessTokensService) {}

  @Get()
  @UseGuards(GithubOauthGuard)
  async githubAuth() {}

  @Get('redirect')
  @UseGuards(GithubOauthGuard)
  async githubAuthRedirect(@CurrentUser() user: User) {
    return this.accessTokensService.genererate(user);
  }
}

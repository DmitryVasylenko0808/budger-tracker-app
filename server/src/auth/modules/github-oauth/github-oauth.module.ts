import { Module } from '@nestjs/common';

import { UsersModule } from 'src/users/users.module';

import { AccessTokensModule } from '../access-tokens/access-tokens.module';
import { GithubOauthController } from './github-oauth.controller';
import { GithubOauthStrategy } from './github-oauth.strategy';

@Module({
  imports: [UsersModule, AccessTokensModule],
  controllers: [GithubOauthController],
  providers: [GithubOauthStrategy],
})
export class GithubOauthModule {}

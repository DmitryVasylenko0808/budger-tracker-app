import { Module } from '@nestjs/common';

import { UsersModule } from 'src/users/users.module';

import { AccessTokensModule } from '../access-tokens/access-tokens.module';
import { GoogleOauthController } from './google-oauth.controller';
import { GoogleOauthStrategy } from './google-oauth.strategy';

@Module({
  imports: [UsersModule, AccessTokensModule],
  controllers: [GoogleOauthController],
  providers: [GoogleOauthStrategy],
})
export class GoogleOauthModule {}

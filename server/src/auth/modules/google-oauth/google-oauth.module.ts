import { Module } from '@nestjs/common';
import { GoogleOauthController } from './google-oauth.controller';
import { GoogleOauthStrategy } from './google-oauth.strategy';
import { UsersModule } from 'src/users/users.module';
import { AccessTokensModule } from '../access-tokens/access-tokens.module';

@Module({
  imports: [UsersModule, AccessTokensModule],
  controllers: [GoogleOauthController],
  providers: [GoogleOauthStrategy],
})
export class GoogleOauthModule {}

import { Module } from '@nestjs/common';

import { EmailModule } from 'src/email/email.module';
import { UsersModule } from 'src/users/users.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { AccessTokensModule } from './modules/access-tokens/access-tokens.module';
import { ConfirmationTokensModule } from './modules/confirmation-tokens/confirmation-tokens.module';
import { EmailConfirmationModule } from './modules/email-confirmation/email-confirmation.module';
import { GithubOauthModule } from './modules/github-oauth/github-oauth.module';
import { GoogleOauthModule } from './modules/google-oauth/google-oauth.module';
import { PasswordRecoveryModule } from './modules/password-recovery/password-recovery.module';
import { TwoFactorModule } from './modules/two-factor/two-factor.module';

@Module({
  imports: [
    UsersModule,
    EmailModule,
    AccessTokensModule,
    ConfirmationTokensModule,
    EmailConfirmationModule,
    PasswordRecoveryModule,
    GoogleOauthModule,
    GithubOauthModule,
    TwoFactorModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { LocalStrategy } from './local.strategy';
import { PrismaService } from 'src/prisma.service';
import { EmailConfirmationModule } from './modules/email-confirmation/email-confirmation.module';
import { PasswordRecoveryModule } from './modules/password-recovery/password-recovery.module';
import { ConfirmationTokensModule } from './modules/confirmation-tokens/confirmation-tokens.module';
import { GoogleOauthModule } from './modules/google-oauth/google-oauth.module';
import { AccessTokensModule } from './modules/access-tokens/access-tokens.module';

@Module({
  imports: [
    UsersModule,
    AccessTokensModule,
    ConfirmationTokensModule,
    EmailConfirmationModule,
    PasswordRecoveryModule,
    GoogleOauthModule,
  ],
  controllers: [AuthController],
  providers: [PrismaService, AuthService, LocalStrategy],
})
export class AuthModule {}

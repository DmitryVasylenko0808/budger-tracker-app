import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { UsersModule } from 'src/users/users.module';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PrismaService } from 'src/prisma.service';
import { ConfirmationTokensService } from './services/confirmation.tokens.service';
import { EmailConfirmationService } from './services/email.confirmation.service';
import { EmailConfirmationController } from './controllers/email.confirmation.controller';
import { EmailModule } from 'src/email/email.module';
import { PasswordRecoveryService } from './services/password.recovery.service';
import { PasswordRecoveryController } from './controllers/password.recovery.controller';

@Module({
  imports: [
    UsersModule,
    EmailModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get('JWT_EXPIRES'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [
    AuthController,
    EmailConfirmationController,
    PasswordRecoveryController,
  ],
  providers: [
    PrismaService,
    AuthService,
    LocalStrategy,
    JwtStrategy,
    ConfirmationTokensService,
    EmailConfirmationService,
    PasswordRecoveryService,
  ],
})
export class AuthModule {}

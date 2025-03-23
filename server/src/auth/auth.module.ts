import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PrismaService } from 'src/prisma.service';
import { EmailConfirmationModule } from './modules/email-confirmation/email-confirmation.module';
import { PasswordRecoveryModule } from './modules/password-recovery/password-recovery.module';
import { ConfirmationTokensModule } from './modules/confirmation-tokens/confirmation-tokens.module';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get('JWT_EXPIRES'),
        },
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    ConfirmationTokensModule,
    EmailConfirmationModule,
    PasswordRecoveryModule,
  ],
  controllers: [AuthController],
  providers: [PrismaService, AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}

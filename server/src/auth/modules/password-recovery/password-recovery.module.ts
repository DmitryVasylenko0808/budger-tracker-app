import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { EmailModule } from 'src/email/email.module';
import { ConfirmationTokensModule } from '../confirmation-tokens/confirmation-tokens.module';
import { PasswordRecoveryController } from './password.recovery.controller';
import { PasswordRecoveryService } from './password.recovery.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [UsersModule, ConfirmationTokensModule, EmailModule],
  controllers: [PasswordRecoveryController],
  providers: [PrismaService, PasswordRecoveryService],
})
export class PasswordRecoveryModule {}

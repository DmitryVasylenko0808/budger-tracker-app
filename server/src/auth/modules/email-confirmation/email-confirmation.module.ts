import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UsersModule } from 'src/users/users.module';
import { EmailConfirmationService } from './email.confirmation.service';
import { EmailConfirmationController } from './email.confirmation.controller';
import { EmailModule } from 'src/email/email.module';
import { ConfirmationTokensModule } from '../confirmation-tokens/confirmation-tokens.module';

@Module({
  imports: [UsersModule, EmailModule, ConfirmationTokensModule],
  controllers: [EmailConfirmationController],
  providers: [PrismaService, EmailConfirmationService],
  exports: [EmailConfirmationService],
})
export class EmailConfirmationModule {}

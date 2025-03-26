import { Module } from '@nestjs/common';

import { EmailModule } from 'src/email/email.module';
import { UsersModule } from 'src/users/users.module';

import { ConfirmationTokensModule } from '../confirmation-tokens/confirmation-tokens.module';
import { EmailConfirmationController } from './email.confirmation.controller';
import { EmailConfirmationService } from './email.confirmation.service';

@Module({
  imports: [UsersModule, EmailModule, ConfirmationTokensModule],
  controllers: [EmailConfirmationController],
  providers: [EmailConfirmationService],
  exports: [EmailConfirmationService],
})
export class EmailConfirmationModule {}

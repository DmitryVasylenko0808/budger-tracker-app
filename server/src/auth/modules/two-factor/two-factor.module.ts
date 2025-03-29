import { Module } from '@nestjs/common';

import { EmailModule } from 'src/email/email.module';
import { UsersModule } from 'src/users/users.module';

import { AccessTokensModule } from '../access-tokens/access-tokens.module';
import { ConfirmationTokensModule } from '../confirmation-tokens/confirmation-tokens.module';
import { TwoFactorController } from './two-factor.controller';
import { TwoFactorService } from './two-factor.service';

@Module({
  imports: [UsersModule, ConfirmationTokensModule, EmailModule, AccessTokensModule],
  providers: [TwoFactorService],
  controllers: [TwoFactorController],
  exports: [TwoFactorService],
})
export class TwoFactorModule {}

import { Module } from '@nestjs/common';

import { ConfirmationTokensService } from './confirmation.tokens.service';

@Module({
  providers: [ConfirmationTokensService],
  exports: [ConfirmationTokensService],
})
export class ConfirmationTokensModule {}

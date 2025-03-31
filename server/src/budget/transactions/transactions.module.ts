import { Module } from '@nestjs/common';

import { ParseNumberArrayPipe } from 'src/common/pipes/parse-number-array.pipe';

import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';

@Module({
  controllers: [TransactionsController],
  providers: [TransactionsService, ParseNumberArrayPipe],
  exports: [TransactionsService],
})
export class TransactionsModule {}

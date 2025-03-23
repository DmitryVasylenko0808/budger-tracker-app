import { Module } from '@nestjs/common';
import { ConfirmationTokensService } from './confirmation.tokens.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [PrismaService, ConfirmationTokensService],
  exports: [ConfirmationTokensService],
})
export class ConfirmationTokensModule {}

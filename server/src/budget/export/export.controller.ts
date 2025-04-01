import { Response } from 'express';

import { Controller, Get, Query, Res, UseGuards } from '@nestjs/common';

import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { ParseNumberArrayPipe } from 'src/common/pipes/parse-number-array.pipe';

import { TokenPayload } from 'src/auth/modules/access-tokens/types/token.payload';

import { ExportService } from './services/export.service';
import { ExportFormat } from './types/export-transactions';

@Controller('export')
@UseGuards(JwtAuthGuard)
export class ExportController {
  constructor(private readonly exportService: ExportService) {}

  @Get('transactions')
  async exportTransactions(
    @Query('format') format: ExportFormat,
    @Query('category_ids', ParseNumberArrayPipe) categoryIds: number[],
    @CurrentUser() user: TokenPayload,
    @Res({ passthrough: true }) res: Response
  ) {
    console.log(format);
    return await this.exportService.exportTransactions(
      { format, userId: user.userId, categoryIds },
      res
    );
  }
}

import { Response } from 'express';

import { Controller, Get, Query, Res, UseGuards } from '@nestjs/common';

import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

import { TokenPayload } from 'src/auth/modules/access-tokens/types/token.payload';

import { ExportService } from './export.service';

@Controller('export')
@UseGuards(JwtAuthGuard)
export class ExportController {
  constructor(private readonly exportService: ExportService) {}

  @Get('transactions')
  async exportTransactions(
    @Query('category_ids') categoryIds: string,
    @Res() res: Response,
    @CurrentUser() user: TokenPayload
  ) {
    const data = await this.exportService.exportTransactions(user.userId, categoryIds);

    res.set({
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename="transactions.csv"',
    });
    res.send(data);
  }
}

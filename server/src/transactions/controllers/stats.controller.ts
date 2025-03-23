import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { StatsService } from '../services/stats.service';
import { CurrentUser } from 'src/auth/decorators';
import { TransactionType } from '@prisma/client';
import { TokenPayload } from 'src/auth/modules/access-tokens/types/token.payload';
import { JwtAuthGuard } from 'src/auth/modules/access-tokens/jwt-auth.guard';

@Controller('stats')
@UseGuards(JwtAuthGuard)
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get('summary')
  async getSummary(@CurrentUser() user: TokenPayload) {
    return await this.statsService.getSummary(user.userId);
  }

  @Get('monthly')
  async getMonthly(@CurrentUser() user: TokenPayload) {
    return await this.statsService.getMonthly(user.userId);
  }

  @Get('breakdown')
  async getBreakdown(
    @CurrentUser() user: TokenPayload,
    @Query('type') type: TransactionType,
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    return await this.statsService.getBreakdown(user.userId, type, from, to);
  }
}

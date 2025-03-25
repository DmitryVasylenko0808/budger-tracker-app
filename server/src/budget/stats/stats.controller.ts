import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { TokenPayload } from 'src/auth/modules/access-tokens/types/token.payload';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { TransactionType } from '@prisma/client';
import { StatsService } from './stats.service';

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

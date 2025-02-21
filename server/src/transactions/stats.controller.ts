import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { StatsService } from './stats.service';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/auth/decorators';
import { TokenPayload } from 'src/auth/types/token.payload';
import { TransactionType } from '@prisma/client';

@Controller('stats')
@UseGuards(AuthGuard('jwt'))
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get('summary')
  async getSummary(@CurrentUser() user: TokenPayload) {
    return await this.statsService.getSummary(user.userId);
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

import { Controller, Get, UseGuards } from '@nestjs/common';
import { StatsService } from './stats.service';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/auth/decorators';
import { TokenPayload } from 'src/auth/types/token.payload';

@Controller('stats')
@UseGuards(AuthGuard('jwt'))
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get('summary')
  async getSummary(@CurrentUser() user: TokenPayload) {
    return await this.statsService.getSummary(user.userId);
  }
}

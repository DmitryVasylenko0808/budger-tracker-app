import { Module } from '@nestjs/common';
import { StatsService } from './stats.service';
import { StatsController } from './stats.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [StatsController],
  providers: [PrismaService, StatsService],
})
export class StatsModule {}

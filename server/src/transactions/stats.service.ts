import { Injectable } from '@nestjs/common';
import { TransactionType } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class StatsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getSummary(userId: number) {
    const summaryIncomes = await this.prismaService.transaction.aggregate({
      where: {
        userId,
        category: {
          type: 'INCOME',
        },
      },
      _sum: {
        amount: true,
      },
    });

    const summaryExpenses = await this.prismaService.transaction.aggregate({
      where: {
        userId,
        category: {
          type: 'EXPENSE',
        },
        createdAt: {},
      },
      _sum: {
        amount: true,
      },
    });

    const totalIncomes = Math.round(summaryIncomes._sum.amount * 100) / 100;
    const totalExpenses = Math.round(summaryExpenses._sum.amount * 100) / 100;
    const balance = Math.round((totalIncomes - totalExpenses) * 100) / 100;

    return { totalIncomes, totalExpenses, balance };
  }

  async getBreakdown(
    userId: number,
    type: TransactionType,
    from?: string,
    to?: string,
  ) {
    const dateFrom = from && new Date(from);

    const lastDate = to?.split('-').map((item) => Number(item));
    const dateTo =
      lastDate && new Date(lastDate[0], lastDate[1] - 1, lastDate[2] + 1);

    const breakdown = await this.prismaService.transaction.groupBy({
      by: ['categoryId'],
      where: {
        userId,
        category: {
          type,
        },
        createdAt: {
          gte: dateFrom,
          lte: dateTo,
        },
      },
      _sum: {
        amount: true,
      },
    });

    return breakdown;
  }
}

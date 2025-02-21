import { Injectable } from '@nestjs/common';
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
}

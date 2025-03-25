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

  async getMonthly(userId: number) {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const data = await this.prismaService.transaction.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'asc',
      },
      include: {
        category: true,
      },
    });

    const firstYear = data[0].createdAt.getFullYear();
    const firstMonth = data[0].createdAt.getMonth();
    const lastYear = data[data.length - 1].createdAt.getFullYear();
    const lastMonth = data[data.length - 1].createdAt.getMonth();

    const monthlyStats = [];

    for (let year = firstYear; year <= lastYear; year++) {
      for (let month = 0; month < 12; month++) {
        if (year === firstYear && month < firstMonth) {
          continue;
        }

        if (year === lastYear && month > lastMonth) {
          break;
        }

        const tMonths = data.filter(
          (t) =>
            t.createdAt.getFullYear() === year &&
            t.createdAt.getMonth() === month,
        );
        const monthIncomes = tMonths
          .filter((t) => t.category.type === 'INCOME')
          .reduce((acc, curr) => (acc += curr.amount), 0);
        const monthExpenses = tMonths
          .filter((t) => t.category.type === 'EXPENSE')
          .reduce((acc, curr) => (acc += curr.amount), 0);

        const monthlyStatsItem = {
          name: `${months[month]} ${year}`,
          incomes: Math.round(monthIncomes * 100) / 100,
          expenses: Math.round(monthExpenses * 100) / 100,
        };

        monthlyStats.push(monthlyStatsItem);
      }
    }

    return monthlyStats;
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

    const categories = await this.prismaService.category.findMany({
      where: {
        userId,
        type,
      },
    });

    const categoriesObj = categories.reduce(
      (acc, curr) => ({ ...acc, [curr.id]: curr }),
      {},
    );

    const res = breakdown.map((group) => ({
      categoryId: group.categoryId,
      categoryName: categoriesObj[group.categoryId].name,
      categoryColor: categoriesObj[group.categoryId].color,
      value: Math.round(group._sum.amount * 100) / 100,
    }));

    return res;
  }
}

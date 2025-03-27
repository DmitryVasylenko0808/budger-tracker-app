import { Prisma, TransactionType } from '@prisma/client';

import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

import { CreateTransactionDto } from './dto/create.transaction.dto';
import { EditTransactionDto } from './dto/edit.transaction.dto';
import { Period } from './types/period';
import { TransactionsPagination } from './types/transactions.pagination';

@Injectable()
export class TransactionsService {
  constructor(private readonly prismaService: PrismaService) {}

  async get(userId: number, page: number = 1, limit: number = 30, categoryIds?: string) {
    const numberCategoryIds = categoryIds?.split(',').map((id) => Number(id));

    const transactions = await this.prismaService.transaction.findMany({
      where: {
        userId,
        categoryId: {
          in: numberCategoryIds,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        category: true,
      },
      omit: {
        notes: true,
      },
    });

    const totalCount = await this.prismaService.transaction.count({
      where: {
        userId,
        categoryId: {
          in: numberCategoryIds,
        },
      },
    });
    const totalPages = Math.ceil(totalCount / limit);

    const res: TransactionsPagination = {
      data: transactions,
      totalCount,
      totalPages,
      currentPage: page,
    };

    return res;
  }

  async getAll(userId: number, sortDate: Prisma.SortOrder = 'asc', categoryIds?: number[]) {
    const data = await this.prismaService.transaction.findMany({
      where: {
        userId,
        categoryId: {
          in: categoryIds,
        },
      },
      orderBy: {
        createdAt: sortDate,
      },
      include: {
        category: true,
      },
    });

    return data;
  }

  async getOneOrThrow(id: number) {
    const transaction = await this.prismaService.transaction.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });

    if (!transaction) {
      throw new NotFoundException('Transaction is not found');
    }

    return transaction;
  }

  async add(createTransactionDto: CreateTransactionDto, userId: number) {
    const { name, amount, createdAt, categoryId, notes } = createTransactionDto;

    const transaction = await this.prismaService.transaction.create({
      data: {
        name,
        amount,
        createdAt,
        notes,
        category: {
          connect: {
            id: categoryId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
      include: {
        category: true,
      },
    });

    return transaction;
  }

  async edit(id: number, editTransactionDto: EditTransactionDto) {
    const { name, amount, createdAt, categoryId, notes } = editTransactionDto;

    await this.getOneOrThrow(id);

    const transaction = await this.prismaService.transaction.update({
      where: { id },
      data: {
        name,
        amount,
        createdAt,
        notes,
        category: {
          connect: {
            id: categoryId,
          },
        },
      },
      include: {
        category: true,
      },
    });

    return transaction;
  }

  async delete(ids: string) {
    const numberIds = ids.split(',').map((id) => Number(id));

    const transaction = await this.prismaService.transaction.deleteMany({
      where: {
        id: {
          in: numberIds,
        },
      },
    });

    return transaction;
  }

  async getSum(userId: number, type: TransactionType) {
    const sum = await this.prismaService.transaction.aggregate({
      where: {
        userId,
        category: {
          type,
        },
      },
      _sum: {
        amount: true,
      },
    });

    return sum;
  }

  async getSumByCategories(userId: number, type: TransactionType, period: Period) {
    const data = await this.prismaService.transaction.groupBy({
      by: ['categoryId'],
      where: {
        userId,
        category: {
          type,
        },
        createdAt: {
          gte: period.dateFrom,
          lte: period.dateTo,
        },
      },
      _sum: {
        amount: true,
      },
    });

    return data;
  }

  async getByCategoryId(categoryId: number, page: number = 1, limit: number = 30) {
    const transactions = await this.prismaService.transaction.findMany({
      where: {
        categoryId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        category: true,
      },
      omit: {
        notes: true,
      },
    });

    const totalCount = await this.prismaService.transaction.count({
      where: {
        categoryId,
      },
    });
    const totalPages = Math.ceil(totalCount / limit);

    const res: TransactionsPagination = {
      data: transactions,
      totalCount,
      totalPages,
      currentPage: page,
    };

    return res;
  }
}

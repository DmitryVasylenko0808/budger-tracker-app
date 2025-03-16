import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateTransactionDto } from '../dto/create.transaction.dto';
import { EditTransactionDto } from '../dto/edit.transaction.dto';
import { TransactionsPagination } from '../types/transactions.pagination';
import { createObjectCsvStringifier } from 'csv-writer';

@Injectable()
export class TransactionsService {
  constructor(private readonly prismaService: PrismaService) {}

  async get(
    userId: number,
    page: number = 1,
    limit: number = 30,
    categoryIds?: string,
  ) {
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

  async getByCategoryId(
    categoryId: number,
    page: number = 1,
    limit: number = 30,
  ) {
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

  async exportAsCsv(userId: number, categoryIds?: string) {
    const numberCategoryIds = categoryIds?.split(',').map((id) => Number(id));

    const data = await this.prismaService.transaction.findMany({
      where: {
        userId,
        categoryId: {
          in: numberCategoryIds,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        category: true,
      },
    });

    const cvsStringifier = createObjectCsvStringifier({
      header: [
        { id: 'name', title: 'Name' },
        { id: 'type', title: 'Type' },
        { id: 'amount', title: 'Amount' },
        { id: 'category', title: 'Category' },
        { id: 'date', title: 'Date' },
      ],
    });

    const records = data.map((tr) => ({
      name: tr.name,
      type: tr.category.type,
      amount: tr.amount,
      category: tr.category.name,
      date: tr.createdAt.toLocaleString(),
    }));

    const csvData =
      cvsStringifier.getHeaderString() +
      cvsStringifier.stringifyRecords(records);

    return csvData;
  }
}

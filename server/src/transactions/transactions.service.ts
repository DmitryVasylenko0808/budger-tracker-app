import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateTransactionDto } from './dto/create.transaction.dto';
import { EditTransactionDto } from './dto/edit.transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(private readonly prismaService: PrismaService) {}

  async get(userId: number) {
    const transactions = await this.prismaService.transaction.findMany({
      where: {
        userId,
      },
      include: {
        category: true,
      },
      omit: {
        notes: true,
      },
    });

    return transactions;
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
    const { name, amount, createdAt, categoryId } = createTransactionDto;

    const transaction = await this.prismaService.transaction.create({
      data: {
        name,
        amount,
        createdAt,
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
    const { name, amount, createdAt, categoryId } = editTransactionDto;

    await this.getOneOrThrow(id);

    const transaction = await this.prismaService.transaction.update({
      where: { id },
      data: {
        name,
        amount,
        createdAt,
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

  async delete(id: number) {
    await this.getOneOrThrow(id);

    const transaction = await this.prismaService.transaction.delete({
      where: { id },
    });

    return transaction;
  }

  async getByCategoryId(categoryId: number) {
    const transactions = await this.prismaService.transaction.findMany({
      where: {
        categoryId,
      },
      include: {
        category: true,
      },
      omit: {
        notes: true,
      },
    });

    return transactions;
  }
}

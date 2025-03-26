import { TransactionType } from '@prisma/client';

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

import { CreateCategoryDto } from './dto/create.category.dto';
import { EditCategoryDto } from './dto/edit.category.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly prismaService: PrismaService) {}

  async get(userId: number, type: TransactionType, search: string = '') {
    const categories = await this.prismaService.category.findMany({
      where: {
        userId: userId,
        type,
        name: {
          startsWith: search,
          mode: 'insensitive',
        },
      },
    });

    return categories;
  }

  async getOneOrThrow(id: number) {
    const category = await this.prismaService.category.findUnique({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException('Category is not found');
    }

    return category;
  }

  async create(dto: CreateCategoryDto, userId: number) {
    const { name, type } = dto;

    const existedCategory = await this.prismaService.category.findFirst({
      where: {
        name,
        type,
        userId,
      },
    });

    if (existedCategory) {
      throw new BadRequestException('The category with this name is already exists');
    }

    const color = '#' + Math.floor(Math.random() * 16777215).toString(16);

    const category = await this.prismaService.category.create({
      data: {
        name,
        color,
        type,
        userId,
      },
    });

    return category;
  }

  async edit(id: number, dto: EditCategoryDto) {
    const { name } = dto;

    const existedCategory = await this.getOneOrThrow(id);

    if (existedCategory.name === name) {
      throw new BadRequestException('The category with this name is already exists');
    }

    const updatedCategory = await this.prismaService.category.update({
      where: { id },
      data: { name },
    });

    return updatedCategory;
  }

  async delete(id: number) {
    await this.getOneOrThrow(id);

    const category = await this.prismaService.category.delete({
      where: {
        id,
      },
    });

    return category;
  }
}

import { TransactionType } from '@prisma/client';

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

import { TokenPayload } from 'src/auth/modules/access-tokens/types/token.payload';

import { TransactionsService } from '../transactions/transactions.service';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create.category.dto';
import { EditCategoryDto } from './dto/edit.category.dto';

@Controller('categories')
@UseGuards(JwtAuthGuard)
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly transactionsService: TransactionsService
  ) {}

  @Get()
  async get(
    @Query('type') type: TransactionType,
    @Query('search') search: string,
    @CurrentUser() user: TokenPayload
  ) {
    return await this.categoriesService.get(user.userId, type, search);
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.categoriesService.getOneOrThrow(id);
  }

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto, @CurrentUser() user: TokenPayload) {
    return await this.categoriesService.create(createCategoryDto, user.userId);
  }

  @Patch(':id')
  async edit(@Param('id', ParseIntPipe) id: number, @Body() editCategoryDto: EditCategoryDto) {
    return await this.categoriesService.edit(id, editCategoryDto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.categoriesService.delete(id);
  }

  @Get(':id/transactions')
  async getTransactionsByCategory(
    @Param('id', ParseIntPipe) id: number,
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number
  ) {
    return await this.transactionsService.getByCategoryId(id, page, limit);
  }
}

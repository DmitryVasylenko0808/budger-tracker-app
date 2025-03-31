import { Response } from 'express';

import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';

import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { ParseNumberArrayPipe } from 'src/common/pipes/parse-number-array.pipe';

import { TokenPayload } from 'src/auth/modules/access-tokens/types/token.payload';

import { CreateTransactionDto } from './dto/create.transaction.dto';
import { EditTransactionDto } from './dto/edit.transaction.dto';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
@UseGuards(JwtAuthGuard)
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  async get(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
    @Query('category_ids', ParseNumberArrayPipe) categoryIds: number[],
    @CurrentUser() user: TokenPayload
  ) {
    return await this.transactionsService.get(user.userId, page, limit, categoryIds);
  }

  @Get(':id')
  async getOnebyId(@Param('id', ParseIntPipe) id: number) {
    return await this.transactionsService.getOneOrThrow(id);
  }

  @Post()
  async add(@Body() createTransactionDto: CreateTransactionDto, @CurrentUser() user: TokenPayload) {
    return await this.transactionsService.add(createTransactionDto, user.userId);
  }

  @Patch(':id')
  async edit(
    @Param('id', ParseIntPipe) id: number,
    @Body() editTransactionDto: EditTransactionDto
  ) {
    return await this.transactionsService.edit(id, editTransactionDto);
  }

  @Delete()
  async delete(@Query('ids') ids: string) {
    return await this.transactionsService.delete(ids);
  }
}

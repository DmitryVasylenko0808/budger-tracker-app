import { Response } from 'express';

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
  Res,
  UseGuards,
} from '@nestjs/common';

import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

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
    @Query('category_ids') categoryIds: string,
    @CurrentUser() user: TokenPayload
  ) {
    return await this.transactionsService.get(user.userId, page, limit, categoryIds);
  }

  @Get('export')
  async exportAsCsv(
    @Query('category_ids') categoryIds: string,
    @Res() res: Response,
    @CurrentUser() user: TokenPayload
  ) {
    const csvData = await this.transactionsService.exportAsCsv(user.userId, categoryIds);

    res.set({
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename="transactions.csv"',
    });
    res.send(csvData);
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

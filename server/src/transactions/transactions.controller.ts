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
import { TransactionsService } from './transactions.service';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/auth/decorators';
import { TokenPayload } from 'src/auth/types/token.payload';
import { CreateTransactionDto } from './dto/create.transaction.dto';
import { EditTransactionDto } from './dto/edit.transaction.dto';

@Controller('transactions')
@UseGuards(AuthGuard('jwt'))
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  async get(@CurrentUser() user: TokenPayload) {
    return await this.transactionsService.get(user.userId);
  }

  @Get(':id')
  async getOnebyId(@Param('id', ParseIntPipe) id: number) {
    return await this.transactionsService.getOneOrThrow(id);
  }

  @Post()
  async add(
    @Body() createTransactionDto: CreateTransactionDto,
    @CurrentUser() user: TokenPayload,
  ) {
    return await this.transactionsService.add(
      createTransactionDto,
      user.userId,
    );
  }

  @Patch(':id')
  async edit(
    @Param('id', ParseIntPipe) id: number,
    @Body() editTransactionDto: EditTransactionDto,
  ) {
    return await this.transactionsService.edit(id, editTransactionDto);
  }

  @Delete()
  async delete(@Query('ids') ids: string) {
    return await this.transactionsService.delete(ids);
  }
}

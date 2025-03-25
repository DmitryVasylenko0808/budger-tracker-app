import {
  Body,
  Controller,
  Get,
  Param,
  ParseFilePipeBuilder,
  ParseIntPipe,
  Patch,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { EditUserDto } from './dto/edit.user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/common/storage/multer.config';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.getByIdOrThrow(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('avatar', multerOptions))
  async edit(
    @Param('id', ParseIntPipe) id: number,
    @Body() editUserDto: EditUserDto,
    @UploadedFile() avatarFile: Express.Multer.File,
  ) {
    return await this.usersService.edit(id, editUserDto, avatarFile?.filename);
  }
}

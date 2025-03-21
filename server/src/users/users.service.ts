import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUser } from './types/create.user';
import { EditUserDto } from './dto/edit.user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async getByIdOrThrow(id: number) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
      omit: {
        passwordHash: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User is not found');
    }

    return user;
  }

  async getByEmail(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async create(dto: CreateUser) {
    const user = await this.prismaService.user.create({
      data: {
        ...dto,
        avatar: 'nullavatar.jpg',
      },
      omit: {
        passwordHash: true,
      },
    });

    return user;
  }

  async edit(id: number, dto: EditUserDto, avatar?: string) {
    await this.getByIdOrThrow(id);

    const user = await this.prismaService.user.update({
      where: { id },
      data: {
        ...dto,
        avatar,
      },
      omit: {
        passwordHash: true,
      },
    });

    return user;
  }

  async markAsVerified(id: number) {
    const user = await this.prismaService.user.update({
      where: { id },
      data: {
        verified: true,
      },
    });

    return user;
  }

  async changePassword(id: number, password: string) {
    const passwordHash = await bcrypt.hash(password, 10);

    const user = await this.prismaService.user.update({
      where: { id },
      data: { passwordHash },
    });

    return user;
  }
}

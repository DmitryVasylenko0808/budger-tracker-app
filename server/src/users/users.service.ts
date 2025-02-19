import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUser } from './types/create.user';

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
      data: dto,
      omit: {
        passwordHash: true,
      },
    });

    return user;
  }

  async edit(dto: unknown) {}
}

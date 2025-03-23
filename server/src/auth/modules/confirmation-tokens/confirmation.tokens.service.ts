import { Injectable } from '@nestjs/common';
import { ConfirmationTokenType } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ConfirmationTokensService {
  constructor(private readonly prismaService: PrismaService) {}

  async findToken(value: string, type: ConfirmationTokenType) {
    const token = await this.prismaService.confirmationToken.findUnique({
      where: {
        value,
        type,
      },
    });

    return token;
  }

  async generateToken(email: string, type: ConfirmationTokenType) {
    const generatedtoken = uuidv4();

    const currentDate = new Date();
    const expiresAt = new Date(currentDate.getTime() + 1000 * 60 * 60);

    const token = await this.prismaService.confirmationToken.create({
      data: {
        value: generatedtoken.toString(),
        email,
        type,
        expiresAt,
      },
    });

    return token;
  }

  async deleteTokens(email: string, type: ConfirmationTokenType) {
    const tokens = await this.prismaService.confirmationToken.deleteMany({
      where: {
        email,
        type,
      },
    });

    return tokens;
  }
}

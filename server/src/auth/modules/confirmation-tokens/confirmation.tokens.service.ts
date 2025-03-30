import { ConfirmationTokenType } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

import { GenerateTokenArgs } from './types/generate-token.args';

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

  async generateToken(args: GenerateTokenArgs) {
    const { email, type, variant = 'token', expiresIn = 1000 * 60 * 60 } = args;

    const generatedToken = variant === 'token' ? uuidv4() : this.generateCode();

    const currentDate = new Date();
    const expiresAt = new Date(currentDate.getTime() + expiresIn);

    const token = await this.prismaService.confirmationToken.create({
      data: {
        value: generatedToken.toString(),
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

  async verify(token: string, type: ConfirmationTokenType) {
    const existedToken = await this.findToken(token, type);

    if (!existedToken) {
      return null;
    }

    const isExpired = existedToken.expiresAt < new Date();

    if (isExpired) {
      return null;
    }

    return existedToken;
  }

  private generateCode(length: number = 6) {
    return [...Array(length)].map(() => Math.floor(Math.random() * 10)).join('');
  }
}

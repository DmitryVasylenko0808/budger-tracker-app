import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { TokenPayload } from './types/token.payload';

@Injectable()
export class AccessTokensService {
  constructor(private readonly jwtService: JwtService) {}

  async genererate(user: User) {
    const tokenPayload: TokenPayload = {
      userId: user.id,
    };
    const access_token = await this.jwtService.signAsync(tokenPayload);

    return { access_token };
  }
}

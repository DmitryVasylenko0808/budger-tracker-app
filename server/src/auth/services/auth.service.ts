import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { EmailConfirmationService } from './email.confirmation.service';
import { SignUpDto } from '../dto/sign.up.dto';
import { TokenPayload } from '../types/token.payload';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly emailConfirmationService: EmailConfirmationService,
  ) {}

  async signUp(dto: SignUpDto) {
    const { email, password, name } = dto;

    const existedUser = await this.usersService.getByEmail(email);

    if (existedUser) {
      throw new NotFoundException('User with this email is already exists');
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const createdUser = await this.usersService.create({
      email,
      passwordHash,
      name,
    });

    await this.emailConfirmationService.sendLink(createdUser.email);

    return createdUser;
  }

  async signIn(user: User) {
    const tokenPayload: TokenPayload = {
      userId: user.id,
    };
    const access_token = await this.generateAccessToken(tokenPayload);

    return { access_token };
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.getByEmail(email);

    if (!user) {
      return null;
    }

    const isValidPass = await bcrypt.compare(password, user.passwordHash);

    if (!isValidPass) {
      return null;
    }

    return user;
  }

  private async generateAccessToken(tokenPayload: TokenPayload) {
    const access_token = await this.jwtService.signAsync(tokenPayload);

    return access_token;
  }
}

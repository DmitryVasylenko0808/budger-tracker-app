import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

import { Injectable, NotFoundException } from '@nestjs/common';

import { UsersService } from 'src/users/users.service';

import { SignUpDto } from './dto/sign.up.dto';
import { AccessTokensService } from './modules/access-tokens/access-tokens.service';
import { EmailConfirmationService } from './modules/email-confirmation/email.confirmation.service';
import { TwoFactorService } from './modules/two-factor/two-factor.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly emailConfirmationService: EmailConfirmationService,
    private readonly twoFactorService: TwoFactorService,
    private readonly accessTokensService: AccessTokensService
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
    if (user.twoFa) {
      await this.twoFactorService.sendTwoFaCode(user.email, user.name);

      return { userTwoFaEnabled: true, email: user.email };
    }

    const accessToken = await this.accessTokensService.genererate(user);

    return accessToken;
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.getByEmail(email);

    if (!user || !user.passwordHash) {
      return null;
    }

    const isValidPass = await bcrypt.compare(password, user.passwordHash);

    if (!isValidPass) {
      return null;
    }

    return user;
  }
}

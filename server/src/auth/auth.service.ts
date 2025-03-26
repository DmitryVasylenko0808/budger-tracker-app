import * as bcrypt from 'bcrypt';

import { Injectable, NotFoundException } from '@nestjs/common';

import { UsersService } from 'src/users/users.service';

import { SignUpDto } from './dto/sign.up.dto';
import { EmailConfirmationService } from './modules/email-confirmation/email.confirmation.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly emailConfirmationService: EmailConfirmationService
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

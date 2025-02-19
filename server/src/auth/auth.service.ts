import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SignUpDto } from './dto/sign.up.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

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

    return createdUser;
  }
}

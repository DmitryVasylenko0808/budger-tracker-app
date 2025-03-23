import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign.up.dto';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from './decorators';
import { User } from '@prisma/client';
import { VerifiedUserGuard } from './verified.user.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Post('sign-in')
  @UseGuards(AuthGuard('local'), VerifiedUserGuard)
  @HttpCode(HttpStatus.OK)
  async signIn(@CurrentUser() user: User) {
    return await this.authService.signIn(user);
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  async getMe(@CurrentUser() user: User) {
    return user;
  }
}

import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';

import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { UsersService } from 'src/users/users.service';

@Injectable()
export class GoogleOauthStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService
  ) {
    super({
      clientID: configService.get<string>('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET'),
      callbackURL: configService.get<string>('GOOGLE_CALLBACK_URL'),
      scope: ['email', 'profile'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
    done: VerifyCallback
  ) {
    const { id, displayName, emails, photos } = profile;

    let user = await this.usersService.getByProvider('GOOGLE', id);

    if (!user) {
      const existedUser = await this.usersService.getByEmail(emails[0].value);

      if (existedUser) {
        throw new ForbiddenException('User with this email is already exists');
      }

      user = await this.usersService.create({
        name: displayName,
        email: emails[0].value,
        provider: 'GOOGLE',
        providerId: id,
        avatar: photos[0].value,
        verified: true,
      });
    }

    done(null, user);
  }
}

import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-github2';

@Injectable()
export class GithubOauthStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      clientID: configService.get<string>('GITHUB_CLIENT_ID'),
      clientSecret: configService.get<string>('GITHUB_CLIENT_SECRET'),
      callbackURL: configService.get<string>('GITHUB_CALLBACK_URL'),
      scope: ['user:email'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
  ) {
    const { id, username, emails, photos } = profile;

    let user = await this.usersService.getByProvider('GITHUB', id);

    if (!user) {
      const existedUser = await this.usersService.getByEmail(emails[0].value);

      if (existedUser) {
        throw new ForbiddenException('User with this email is already exists');
      }

      user = await this.usersService.create({
        name: username,
        email: emails[0].value,
        provider: 'GITHUB',
        providerId: id,
        avatar: photos[0].value,
        verified: true,
      });
    }

    return user;
  }
}

import { Module } from '@nestjs/common';
import { AccessTokensService } from './access-tokens.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get('JWT_EXPIRES'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AccessTokensService, JwtStrategy],
  exports: [AccessTokensService, JwtStrategy],
})
export class AccessTokensModule {}

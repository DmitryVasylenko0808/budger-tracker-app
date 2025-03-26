import { ResendModule } from 'nestjs-resend';

import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { EmailService } from './email.service';

@Module({
  imports: [
    ResendModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        apiKey: configService.get('RESEND_API_KEY'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}

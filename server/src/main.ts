import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);

  app.enableCors();
  app.setGlobalPrefix('api');
  app.useStaticAssets(join(__dirname, '..', '..', 'uploads/avatars'), {
    prefix: '/avatars',
  });

  await app.listen(configService.get('PORT') || 3000);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.enableCors({
    allowedHeaders: ['content-type'],
    credentials: true,
    origin:
      process.env.NODE_ENV || 'development'
        ? process.env.DEV_ORIGIN_URL
        : process.env.PROD_ORIGIN_URL,
  });

  await app.listen(3000, '0.0.0.0');
}
bootstrap();

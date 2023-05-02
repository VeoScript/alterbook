import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { RequestHandler } from 'express-serve-static-core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const cookieParserMiddleware: RequestHandler = cookieParser();
  app.use(cookieParserMiddleware);

  app.enableCors({
    allowedHeaders: ['content-type'],
    credentials: true,
    origin:
      process.env.NODE_ENV || 'development'
        ? process.env.DEV_ORIGIN_URL
        : process.env.PROD_ORIGIN_URL,
  });

  await app.listen(3333);
}
bootstrap();

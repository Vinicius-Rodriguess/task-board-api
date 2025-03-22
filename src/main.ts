import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  process.env.TZ = '-03.00';

  if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
    app.enableCors({
      origin: process.env.FRONTEND_URL,
    });
  }

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.APP_PORT ?? 4000);
}
bootstrap();

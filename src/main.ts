import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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

  const documentBuilderConfig = new DocumentBuilder()
    .setTitle('Task Board API')
    .setDescription(
      'Este projeto é a API back-end para um sistema de gerenciamento de notas.',
    )
    .addBearerAuth()
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, documentBuilderConfig);

  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.APP_PORT ?? 4000);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from './utils/env';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import { WinstonLogger } from './utils/winston-logger/winston-logger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: new WinstonLogger(), });

  app.use(helmet())

  // Enable Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    }),
  );

  // Enable cors
  app.enableCors({
    origin: '*',
  });

  const config = new DocumentBuilder()
    .setTitle('Title')
    .setDescription('The description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(env.PORT);
}
bootstrap();

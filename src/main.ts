import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from './utils/env';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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
  
  await app.listen(env.PORT);
}
bootstrap();

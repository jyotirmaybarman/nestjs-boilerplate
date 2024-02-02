import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from './utils/env';

@Module({
  imports: [
    ConfigModule.forRoot({ validate, isGlobal: true })
  ],
})
export class AppModule {}

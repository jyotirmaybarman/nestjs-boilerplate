import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from './utils/env';
import { MyTypeOrmModule } from './providers/typeorm/my-typeorm.module';

@Module({
  imports: [
    ConfigModule.forRoot({ validate, isGlobal: true }),
    MyTypeOrmModule
  ],
})
export class AppModule {}

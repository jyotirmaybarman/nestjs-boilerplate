import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from './utils/env';
import { MyTypeOrmModule } from './providers/typeorm/my-typeorm.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ validate, isGlobal: true }),
    MyTypeOrmModule,
    UsersModule,
  ],
})
export class AppModule {}

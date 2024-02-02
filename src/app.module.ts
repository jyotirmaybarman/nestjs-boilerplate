import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from './utils/env';
import { MyTypeOrmModule } from './providers/typeorm/my-typeorm.module';
import { UsersModule } from './models/users/users.module';
import { QueueModule } from './providers/queue/queue.module';

@Module({
  imports: [
    ConfigModule.forRoot({ validate, isGlobal: true }),
    MyTypeOrmModule,
    UsersModule,
    QueueModule,
  ],
})
export class AppModule {}

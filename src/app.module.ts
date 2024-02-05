import { Module } from '@nestjs/common';
import { MyTypeOrmModule } from './providers/typeorm/my-typeorm.module';
import { UsersModule } from './models/users/users.module';
import { QueueModule } from './providers/queue/queue.module';

@Module({
  imports: [
    MyTypeOrmModule,
    UsersModule,
    QueueModule,
  ],
})
export class AppModule {}

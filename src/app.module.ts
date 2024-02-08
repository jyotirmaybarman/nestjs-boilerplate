import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MyTypeOrmModule } from './providers/typeorm/my-typeorm.module';
import { UsersModule } from './models/users/users.module';
import { QueueModule } from './providers/queue/queue.module';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-ioredis-yet';
import { env } from './utils/env';
import { RequestLoggerMiddleware } from './common/middlewares/request-logger.middleware';

@Module({
  imports: [
    MyTypeOrmModule,
    UsersModule,
    QueueModule,
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => ({
        store: await redisStore({
          host: env.REDIS_HOST,
          port: env.REDIS_PORT,
          db: env.REDIS_QUEUE_DB,
          username: env.REDIS_USERNAME,
          password: env.REDIS_PASSWORD,
        }),
      }),
    }),
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}

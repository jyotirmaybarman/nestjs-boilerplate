import { Module, Global } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { QueueService } from './lib/queue.service';
import { QueueProcessor } from './lib/queue.processor';
import { QUEUES } from './lib/queue.constants';
import { QueueJobs } from './queue.jobs';
import { EnvSchema } from 'src/utils/env';

@Global()
@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService<EnvSchema>) => {
        return {
          redis: {
            host: configService.get('REDIS_HOST'),
            port: configService.get('REDIS_PORT'),
            username: configService.get('REDIS_USERNAME'),
            password: configService.get('REDIS_PASSWORD'),
          },
        };
      },
    }),
    BullModule.registerQueue({
      name: QUEUES.DEFAULT_QUEUE,
    }),
  ],
  providers: [QueueService, QueueProcessor, QueueJobs],
  exports: [QueueService],
})
export class QueueModule {}

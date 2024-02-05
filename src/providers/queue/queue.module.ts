import { Module, Global } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { QueueService } from './lib/queue.service';
import { QueueProcessor } from './lib/queue.processor';
import { QUEUES } from './lib/queue.constants';
import { QueueJobs } from './queue.jobs';
import { env } from 'src/utils/env';

@Global()
@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: env.REDIS_HOST,
        port: env.REDIS_PORT,
        username: env.REDIS_USERNAME,
        password: env.REDIS_PASSWORD,
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

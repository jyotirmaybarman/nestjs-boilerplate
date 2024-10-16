import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { QUEUES } from './queue.constants';
import { QueueJobs } from '../queue.jobs';
import { WinstonLogger } from 'src/utils/winston-logger/winston-logger';

type InstanceMethodNames<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? K : never;
}[keyof T];

type MethodParameter<T, K extends InstanceMethodNames<T>> = K extends keyof T
  ? T[K] extends (data: infer P) => any
    ? P
    : never
  : never;

type Job<T> = {
  [K in InstanceMethodNames<T>]: {
    task: K;
    payload: MethodParameter<T, K>;
  };
}[InstanceMethodNames<T>];


@Injectable()
export class QueueService {
  private logger = new WinstonLogger(QueueService.name);
  constructor(@InjectQueue(QUEUES.DEFAULT_QUEUE) private queue: Queue) {
    let count = 0;
    let interval = setInterval(() => {
      if (queue.client.status != 'ready' && count == 5) {
        this.logger.error('QUEUE: unable to connect to redis');
        clearInterval(interval);
      } else if (queue.client.status != 'ready' && count < 5) {
        count++;
      } else {
        this.logger.log('QUEUE: is ready');
        clearInterval(interval);
      }
    }, 1000);
  }
  async addJob(job: Job<QueueJobs>) {
    return await this.queue.add(job);
  }
}

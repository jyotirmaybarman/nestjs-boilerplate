import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { QUEUES } from './queue.constants';
import { QueueJobs } from '../queue.jobs';
import { JobPayloadTypeMapper } from '../job-payload-type-mapper';
import { WinstonLogger } from 'src/utils/winston-logger/winston-logger';

export type JobNames = keyof QueueJobs;
type JobDto<T extends JobNames> = JobPayloadTypeMapper[T];

export type Job<T extends JobNames> = {
  task: T;
  payload: JobDto<T>;
};

@Injectable()
export class QueueService {
  private logger = new WinstonLogger(QueueService.name);
  constructor(@InjectQueue(QUEUES.DEFAULT_QUEUE) private queue: Queue) {
    let count = 0;
    let interval = setInterval(()=>{
      if(queue.client.status != "ready" && count == 5){
        this.logger.error("QUEUE: unable to connect to redis");
        clearInterval(interval);
      }
      else if(queue.client.status != "ready" && count < 5){
        count++;
      }
      else{
        this.logger.log("QUEUE: is ready");
        clearInterval(interval);
      }
    }, 1000)
  }
  async addJob<T extends JobNames>(job: Job<T>) {
    return await this.queue.add(job);
  }
}

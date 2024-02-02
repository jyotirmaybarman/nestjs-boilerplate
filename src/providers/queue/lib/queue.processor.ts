import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { QueueJobs } from '../queue.jobs';
import { QUEUES } from './queue.constants';

@Processor(QUEUES.DEFAULT_QUEUE)
export class QueueProcessor {
  constructor(private readonly queueJobs: QueueJobs) {}

  @Process()
  async process(job: Job) {
    try {
      console.log('Processing job: #' + job.id);
      await this.queueJobs[job.data.task](job.data);
      console.log('Processed job: #' + job.id);
      return true;
    } catch (error) {
      console.error(error);
      console.log('Failed to process job: #' + job.id);
      return false;
    }
  }
}

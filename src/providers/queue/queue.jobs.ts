import { Injectable } from '@nestjs/common';
import { env } from 'src/utils/env';
import { WinstonLogger } from 'src/utils/winston-logger/winston-logger';
import { Job } from './lib/job.decorator';

@Injectable()
export class QueueJobs {
  private logger = new WinstonLogger(QueueJobs.name);
  constructor(){}
  
  @Job()
  async doSomething(data: { message: string }){
    this.logger.log(`Database Type: ${env.DB_TYPE}`, );
    this.logger.log({
      message: "Logging the paylod",
      data
    });
    return true;
  }
}

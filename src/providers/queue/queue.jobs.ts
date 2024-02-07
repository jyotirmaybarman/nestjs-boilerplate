import { Injectable } from '@nestjs/common';
import { DoSomethingPayload } from './payload-types/do-something-job.type';
import { env } from 'src/utils/env';
import { WinstonLogger } from 'src/utils/winston-logger/winston-logger';

@Injectable()
export class QueueJobs {
  private logger = new WinstonLogger(QueueJobs.name);
  constructor(){}
  
  async doSomething(data: DoSomethingPayload){
    this.logger.log(`Database Type: ${env.DB_TYPE}`, );
    this.logger.log({
      message: "Logging the paylod",
      data
    });
    return true;
  }
}

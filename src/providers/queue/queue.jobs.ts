import { Injectable } from '@nestjs/common';
import { DoSomethingPayload } from './payload-types/do-something-job.type';
import { env } from 'src/utils/env';

@Injectable()
export class QueueJobs {
  constructor(){}
  
  async doSomething(data: DoSomethingPayload){
    console.log('Database Type: ', env.DB_TYPE);
    console.log('logging the payload: ', data);
    return true;
  }
}

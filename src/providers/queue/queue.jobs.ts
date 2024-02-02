import { Injectable } from '@nestjs/common';
import { DoSomethingPayload } from './payload-types/do-something-job.type';
import { ConfigService } from '@nestjs/config';
import { EnvSchema } from 'src/utils/env';

@Injectable()
export class QueueJobs {
  constructor(private readonly configService: ConfigService<EnvSchema>){}
  
  async doSomething(data: DoSomethingPayload){
    console.log('Database Type: ', this.configService.get('DB_TYPE'));
    console.log('logging the payload: ', data);
    return true;
  }
}

import { Injectable } from '@nestjs/common';
import * as jwksClient from 'jwks-rsa';
import { env } from 'src/utils/env';
import { WinstonLogger } from 'src/utils/winston-logger/winston-logger';

@Injectable()
export class JwksService {
  client: jwksClient.JwksClient;
  initialized = false
  private logger = new WinstonLogger(JwksService.name);
  constructor() {
    if(!env.JWKS_URI){
        this.logger.warn("Found no `JWKS_URI`, skipping JwksService initialization.");
        return;
    }

    this.client = jwksClient({
      jwksUri: env.JWKS_URI,
      cache: true,
      rateLimit: true,
    });
    this.initialized = true;

  }
}

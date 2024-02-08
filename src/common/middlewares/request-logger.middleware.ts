import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { WinstonLogger } from 'src/utils/winston-logger/winston-logger';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  private readonly logger = new WinstonLogger(RequestLoggerMiddleware.name);

  use(req: Request, res: Response, next: NextFunction) {
    res.on('finish', () => {
      if (res.statusCode >= 400 && res.statusCode < 600) {
        this.logger.error(`[${req.method}] \`${req.url}\` : ${res.statusMessage ? res.statusCode + ' - '+ res.statusMessage: res.statusCode}`);
      }else{
        this.logger.log(`[${req.method}] \`${req.url}\` : ${res.statusMessage ? res.statusCode + ' - '+ res.statusMessage: res.statusCode}`);
      }
    });
    next();
  }
}
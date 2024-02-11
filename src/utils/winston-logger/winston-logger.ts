import { Injectable, LoggerService } from '@nestjs/common';
import { getLogger } from './winston';

export type LogPayload = string | {
  message: string;
  data?: any;
  stack?: string;
  context?: string;
};

@Injectable()
export class WinstonLogger implements LoggerService {
  private wLogger = getLogger();
  private context: string;

  constructor(ctx?: string) {
    if(ctx) this.context = ctx;
  }

  setContext(ctx: string) {
    this.context = ctx;
  }

  getContext() {
    return this.context;
  }

  log(payload: LogPayload, context?:string) {
    let message:any = payload, data:any, stack: string;
    if(typeof payload == "object"){
      context = payload.context ? payload.context : this.context;
      stack = payload.stack ? payload.stack : stack;
      message = payload.message && typeof payload.message == 'string' ? payload.message : 'Warning';
      data = payload instanceof Error || !payload.message || typeof payload.message != 'string' ? payload : payload.data;
    }
    
    this.wLogger.info({
      context: context ?? this.context,
      message,
      data,
      stack,
    });
  }
  
  fatal(payload: LogPayload, context?:string) {
    let message:any = payload, data:any, stack: string;
    if(typeof payload == "object"){
      context = payload.context ? payload.context : this.context;
      stack = payload.stack ? payload.stack : stack;
      message = payload.message && typeof payload.message == 'string' ? payload.message : 'Warning';
      data = payload instanceof Error || !payload.message || typeof payload.message != 'string' ? payload : payload.data;
    }
    
    this.wLogger.log({
      level: "fatal",
      context: context ?? this.context,
      message,
      data,
      stack,
    });
  }
  
  error(payload: LogPayload, context?:string) {
    let message:any = payload, data:any, stack: string;
    if(typeof payload == "object"){
      context = payload.context ? payload.context : this.context;
      stack = payload.stack ? payload.stack : stack;
      message = payload.message && typeof payload.message == 'string' ? payload.message : 'Warning';
      data = payload instanceof Error || !payload.message || typeof payload.message != 'string' ? payload : payload.data;
    }
    
    this.wLogger.error({
      context: context ?? this.context,
      message,
      data,
      stack,
    });
  }

  warn(payload: LogPayload, context?:string) {
    let message:any = payload, data:any, stack: string;
    if(typeof payload == "object"){
      context = payload.context ? payload.context : this.context;
      stack = payload.stack ? payload.stack : stack;
      message = payload.message && typeof payload.message == 'string' ? payload.message : 'Warning';
      data = payload instanceof Error || !payload.message || typeof payload.message != 'string' ? payload : payload.data;
    }
    
    this.wLogger.warn({
      context: context ?? this.context,
      message,
      data,
      stack,
    });
  }

  debug(payload: LogPayload, context?:string) {
    let message:any = payload, data:any, stack: string;
    if(typeof payload == "object"){
      context = payload.context ? payload.context : this.context;
      stack = payload.stack ? payload.stack : stack;
      message = payload.message && typeof payload.message == 'string' ? payload.message : 'Warning';
      data = payload instanceof Error || !payload.message || typeof payload.message != 'string' ? payload : payload.data;
    }
    
    this.wLogger.warn({
      context: context ?? this.context,
      message,
      data,
      stack,
    });
  }

  verbose(payload: LogPayload, context?:string) {
    let message:any = payload, data:any, stack: string;
    if(typeof payload == "object"){
      context = payload.context ? payload.context : this.context;
      stack = payload.stack ? payload.stack : stack;
      message = payload.message && typeof payload.message == 'string' ? payload.message : 'Warning';
      data = payload instanceof Error || !payload.message || typeof payload.message != 'string' ? payload : payload.data;
    }
    
    this.wLogger.verbose({
      context: context ?? this.context,
      message,
      data,
      stack,
    });
  }
}

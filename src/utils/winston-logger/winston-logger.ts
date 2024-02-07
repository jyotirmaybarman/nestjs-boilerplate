import { Injectable, LoggerService } from '@nestjs/common';
import { getLogger } from './winston';

export type LogPayload = string | {
  message: string,
  data?: any,
  context?:string,
  stack?: string,
}

@Injectable()
export class WinstonLogger implements LoggerService {
  private wLogger = getLogger();
  private context: string;

  constructor(ctx?: string) {
    ctx ? this.context = ctx : ''
  }

  setContext(ctx: string) {
    this.context = ctx;
  }

  getContext() {
    return this.context;
  }

  /**
   * Write a 'log' level log.
   */
  log(payload: LogPayload, context?: string, stack?: string) {
    let msg = payload, data:string;
    if (typeof payload == 'object') {
      msg = payload.message;
      if(payload.data) data = payload.data;
      if(payload.context) context = payload.context;
      if(payload.stack) stack = payload.stack;
    }

    this.wLogger.info({
      context: context ?? this.context,
      message: msg,
      data,
      stack,
    });
  }

  /**
   * Write a 'fatal' level log.
   */
  fatal(payload: LogPayload, context?: string, stack?: string) {
    let msg = payload, data:string;
    if (typeof payload == 'object') {
      msg = payload.message;
      if(payload.data) data = payload.data;
      if(payload.context) context = payload.context;
      if(payload.stack) stack = payload.stack;
    }

    this.wLogger.log('fatal', {
      context: context ?? this.context,
      message: msg,
      data,
      stack,
    });
  }

  /**
   * Write an 'error' level log.
   */
  error(payload: LogPayload, context?: string, stack?: string) {
    let msg = payload, data:string;
    if (typeof payload == 'object') {
      msg = payload.message;
      if(payload.data) data = payload.data;
      if(payload.context) context = payload.context;
      if(payload.stack) stack = payload.stack;
    }

    this.wLogger.error({
      context: context ?? this.context,
      message: msg,
      data,
      stack,
    });
  }

  /**
   * Write a 'warn' level log.
   */
  warn(payload: LogPayload, context?: string, stack?: string) {
    let msg = payload, data:string;
    if (typeof payload == 'object') {
      msg = payload.message;
      if(payload.data) data = payload.data;
      if(payload.context) context = payload.context;
      if(payload.stack) stack = payload.stack;
    }

    this.wLogger.warn({
      context: context ?? this.context,
      message: msg,
      data,
      stack,
    });
  }

  /**
   * Write a 'debug' level log.
   */
  debug?(payload: LogPayload, context?: string, stack?: string) {
    let msg = payload, data:string;
    if (typeof payload == 'object') {
      msg = payload.message;
      if(payload.data) data = payload.data;
      if(payload.context) context = payload.context;
      if(payload.stack) stack = payload.stack;
    }

    this.wLogger.debug({
      context: context ?? this.context,
      message: msg,
      data,
      stack,
    });
  }

  /**
   * Write a 'verbose' level log.
   */
  verbose?(payload: LogPayload, context?: string, stack?: string) {
    let msg = payload, data:string;
    if (typeof payload == 'object') {
      msg = payload.message;
      if(payload.data) data = payload.data;
      if(payload.context) context = payload.context;
      if(payload.stack) stack = payload.stack;
    }

    this.wLogger.verbose({
      context: context ?? this.context,
      message: msg,
      data,
      stack,
    });
  }
}

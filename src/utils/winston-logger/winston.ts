import { inspect } from 'util';
import { createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';

const onlyLevels = (levels:string[]) => format(info => {
  if (levels.includes(info.level)) {
    return info;
  }
})();

export const getLogger = () =>{
  return createLogger({
    levels: {
      fatal: 0,
      error: 1,
      warn: 2,
      info: 3,
      debug: 4,
      verbose: 5,
    },
    level: 'verbose',
    transports: [
      new transports.DailyRotateFile({
        filename: 'logs/%DATE%-error.log',
        level: 'error',
        format: format.combine(format.timestamp(), format.json()),
        datePattern: 'YYYY-MM-DD',
        zippedArchive: false,
        maxFiles: '30d',
      }),
      
      
      new transports.DailyRotateFile({
        filename: `logs/%DATE%-api.log`,
        level: 'info',
        format: format.combine(onlyLevels(['info', 'warn']), format.timestamp(), format.json()),
        datePattern: 'YYYY-MM-DD',
        zippedArchive: false,
        maxFiles: '30d',
      }),

      
      new transports.Console({
        level: 'verbose',
        format: format.combine(
          format.prettyPrint(),
          format.timestamp({ format: 'YYYY/MM/DD, hh:mm:ss a' }),
          format.ms(),
          format.printf((info) => {
            const gc = (arg: string) => '\x1b[' + arg;
            const gt = (content: string, color:string, bold?: boolean) =>  color +`${bold ? '\x1b[1m' : ''}`+ content + gc('0m');
            
            let primary = gc('31m');
            let secondary = gc('33m');
            let base = gc('0m')
            let bold = false;
            let showMs = ['NestFactory', 'InstanceLoader', 'RoutesResolver', 'RouterExplorer', 'NestApplication'].includes(info.context)
  
            switch(info.level){
              case 'info':
                primary = gc('32m');
                bold = false;
                break;
              case 'warn':
                primary = gc('33m');
                bold = false;
                break;
              case 'verbose':
                primary = gc('36m');
                bold = false;
                break;
              case 'fatal':
                primary = gc('37m');
                bold = true;
                break;
              case 'debug':
                primary = gc('35m');
                bold = false;
                break;
            }
  
            let appAndPid = gt(`[Nest] ${process.pid}  - `, primary, bold) + " "
            let logTimeStamp = gt(info.timestamp, base, bold) + "   "
            let logLevel = gt(String(info.level).toUpperCase(), primary, bold) + " "
            let logContext = gt(info.context ? `[${info.context}]` : '\b', secondary, bold) + " "
            let logMessage = gt(info.message, primary, bold) + " "
            let logMs = gt(info.ms, secondary, bold)
            let obj = info.data ? inspect(info.data, { depth: null, colors: true }) : info.data
  
            return appAndPid + logTimeStamp + logLevel +(logContext.length > 900 ? '\n': '')+ logContext + (logContext.length > 30 ? '\n\n': '') + logMessage + (showMs? logMs : '') + (obj ?  obj : '');
          }),
        ),
      }),
    ],
  });
} 


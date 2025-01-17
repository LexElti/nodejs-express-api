import { Logger } from 'tslog';
import { ILogger } from './logger.interface';

export class LoggerService implements ILogger {
  logger: Logger;

  constructor() {
    this.logger = new Logger({
      displayInstanceName: false,
      displayLoggerName: false,
      displayFunctionName: false,
      displayFilePath: 'hidden'
    });
  }

  log(...args: unknown[]) {
    this.logger.info(args);
  }

  error(...args: unknown[]) {
    this.logger.error(args);
  }

  warn(...args: unknown[]) {
    this.logger.warn(args);
  }
}

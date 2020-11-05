import Debug, { Debugger } from 'debug';
import { application } from '@shared/config';
import { LoggerDTO } from '@domain/shared/Contracts';

export default class Logger implements LoggerDTO {
  private debug: Debugger;

  constructor() {
    this.debug = Debug(`${application.logs.name}${application.logs.level}`);
  }

  public async error(message: string): Promise<void> {
    this.debug('ERROR', {
      message,
    });
  }

  public async info(message: string): Promise<void> {
    this.debug('SUCCESS', {
      message,
    });
  }
}

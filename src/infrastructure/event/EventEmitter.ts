import events from 'events';

export default class EventEmitter extends events.EventEmitter {
  private static instance: events.EventEmitter;

  constructor() {
    super();
    this.checkConnection();
  }

  public static getInstance(): events.EventEmitter {
    if (!EventEmitter.instance) {
      EventEmitter.instance = new events.EventEmitter();
    }

    return EventEmitter.instance;
  }

  public async checkConnection(): Promise<boolean> {
    return this.emit('ready');
  }
}

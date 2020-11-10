import { EventEmitter as EventEmitterClient } from '@infrastructure/event';

export const eventEmitter = EventEmitterClient.getInstance();

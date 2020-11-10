import Controller from './Controller';
import * as Repository from './Repository';
import * as UseCase from './UseCases';
import * as Events from './EventEmitter';

export default {
  controller: Controller,
  repository: Repository,
  useCase: UseCase,
  events: Events,
};

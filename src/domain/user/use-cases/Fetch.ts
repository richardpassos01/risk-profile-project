import { EventEmitter, FinishedCallback } from '@domain/shared/Contracts';
import { Events } from '@shared/enums/Events';
import { UserNotFound } from '../error';
import { Fetchable } from '../Repository';
import User from '../User';

export default class Fetch {
  constructor(
    private readonly eventEmitter: EventEmitter,
    private readonly fetcher: Fetchable,
  ) { }

  async execute(
    userId: string,
    finish: FinishedCallback,
  ): Promise<void> {
    const userData = await this.fetcher.fetch(userId);
    if (!userData) {
      throw new UserNotFound();
    }

    const user = new User(userData);
    user.prepareToReadFromDatabase();

    const data = {
      user,
      finish,
    };

    this.eventEmitter.emit(Events.ShouldCalculateBaseBaseScore, data);
  }
}

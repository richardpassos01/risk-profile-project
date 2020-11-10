import { EventEmitter, LoggerDTO } from '@domain/shared/Contracts';
import { UserDTO } from '@domain/user';
import { Events } from '@shared/enums/Events';
import { NextFunction } from 'express';

interface CreateRiskProfileEvent {
  user: UserDTO;
  finish: NextFunction;
}
export default class CalculatesBaseScoreByRiskQuestions {
  constructor(
    private readonly eventEmitter: EventEmitter<CreateRiskProfileEvent>,
    public readonly logger: LoggerDTO,
  ) {
    this.listener();
  }

  listener(): void {
    this.eventEmitter.on(Events.ShouldCalculateBaseBaseScore, (data) => {
      this.execute(data);
    });
  }

  async execute({ user, finish }: CreateRiskProfileEvent): Promise<void> {
    const reducer = (
      accumulator: any,
      currentValue: any,
    ) => accumulator + currentValue;

    const baseScore = user.risk_questions.reduce(reducer);

    await this.logger.info(`The basic score by the sum of the answers to the risk questions ${baseScore}`);
    const data = {
      baseScore,
      user,
      finish,
    };

    this.eventEmitter.emit(Events.CreateRiskProfileByScoreAndUser, data);
  }
}

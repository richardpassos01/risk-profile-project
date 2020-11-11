import { EventEmitter, FinishedCallback, LoggerDTO } from '@domain/shared/Contracts';
import { UserDTO } from '@domain/user';
import { Events } from '@shared/enums/Events';
import { MissingEvent } from '../error';

interface CreateRiskProfileEvent {
  user: UserDTO;
  finish: FinishedCallback;
}

interface DataAcceptOnEvent {
  baseScore: number;
  user: UserDTO;
  finish: FinishedCallback;
}
export default class CalculatesBaseScoreByRiskQuestions {
  constructor(
    private readonly eventEmitter: EventEmitter<CreateRiskProfileEvent>,
    public readonly logger: LoggerDTO,
  ) {
    this.listener();
  }

  private listener(): void {
    this.eventEmitter.on(Events.ShouldCalculateBaseBaseScore, (data) => {
      this.execute(data);
    });
  }

  private async execute({ user, finish }: CreateRiskProfileEvent): Promise<void> {
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

    return this.dispatch(data);
  }

  private dispatch(data: DataAcceptOnEvent): void {
    if (this.eventEmitter._events[Events.CreateRiskProfileByScoreAndUser]) {
      return this.eventEmitter.emit(Events.CreateRiskProfileByScoreAndUser, data);
    }

    throw new MissingEvent();
  }
}

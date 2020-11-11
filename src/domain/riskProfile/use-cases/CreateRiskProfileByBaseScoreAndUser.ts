import { UserDTO } from '@domain/user';
import { EventEmitter, FinishedCallback, LoggerDTO } from '@domain/shared/Contracts';
import { Events } from '@shared/enums/Events';
import RiskProfile from '../RiskProfile';

interface CreateRiskProfileEvent {
  user: UserDTO;
  baseScore: number;
  finish: FinishedCallback;
}

export default class CreateRiskProfileByBaseScoreAndUser {
  constructor(
    private readonly eventEmitter: EventEmitter<CreateRiskProfileEvent>,
    public readonly logger: LoggerDTO,
  ) {
    this.listener();
  }

  listener(): void {
    this.eventEmitter.on(Events.CreateRiskProfileByScoreAndUser, (data) => {
      this.execute(data);
    });
  }

  async execute({ user, baseScore, finish }: CreateRiskProfileEvent): Promise<void> {
    const riskProfile = new RiskProfile({
      userId: user.id,
      baseEligibleStatus: true,
      baseScore,
    });

    const data = {
      user,
      riskProfile,
      finish,
    };

    this.eventEmitter.emit(Events.DetermineInsuranceEligibility, data);
  }
}

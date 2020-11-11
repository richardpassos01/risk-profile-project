import { EventEmitter, LoggerDTO } from '@domain/shared/Contracts';
import { AvailableRiskPoints } from '@shared/enums/AvailableRiskPoints';
import { Events } from '@shared/enums/Events';
import { IncomeSituationByMoneyQuantityInThousands } from '@shared/enums/IncomeSituationByMoneyQuantityInThousands';
import { ModifyRiskPoints } from '../Repository';
import { CreateRiskProfileEvent } from '../RiskProfile';

export default class CalculatesRiskPointsByIncome {
  constructor(
    private readonly eventEmitter: EventEmitter<CreateRiskProfileEvent>,
    private readonly deductRiskPointForEligibleInsurances: ModifyRiskPoints,
    private readonly logger: LoggerDTO,
  ) {
    this.listener();
  }

  listener(): void {
    this.eventEmitter.on(Events.CalculatesRiskPointsByIncome, (data) => {
      this.execute(data);
    });
  }

  async execute({ user, riskProfile, finish }: CreateRiskProfileEvent): Promise<void> {
    if (user.income > IncomeSituationByMoneyQuantityInThousands.Safe) {
      const insurances = Object.keys(riskProfile);

      insurances.forEach(async (insurance) => {
        await this.deductRiskPointForEligibleInsurances.execute(
          insurance,
          AvailableRiskPoints.One,
          riskProfile,
        );
      });

      this.logger.info(`${AvailableRiskPoints.One} risk points were deducted from all insurance lines because the user income is above $${IncomeSituationByMoneyQuantityInThousands.Safe.toFixed(2)}.`);
    }

    const data = {
      user,
      riskProfile,
      finish,
    };

    this.eventEmitter.emit(Events.CalculatesRiskPointsByHouse, data);
  }
}

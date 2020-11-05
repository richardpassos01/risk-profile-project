import { LoggerDTO } from '@domain/shared/Contracts';
import { User } from '@domain/user';
import { AvailableRiskPoints } from '@shared/enums/AvailableRiskPoints';
import { IncomeSituationByMoneyQuantityInThousands } from '@shared/enums/IncomeSituationByMoneyQuantityInThousands';
import { ModifyRiskPoints } from '../Repository';
import RiskProfile from '../RiskProfile';

export default class CalculatesRiskPointsByIncome {
  constructor(
    private readonly deductRiskPointForEligibleInsurances: ModifyRiskPoints,
    private readonly logger: LoggerDTO,
  ) { }

  async execute(user: User, riskProfile: RiskProfile): Promise<void> {
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
  }
}

import { LoggerDTO } from '@domain/shared/Contracts';
import { User } from '@domain/user';
import { AvailableRiskPoints } from '@shared/enums/AvailableRiskPoints';
import { SuitabilityRiskProfileNames } from '@shared/enums/SuitabilityRiskProfileNames';
import { ModifyRiskPoints } from '../Repository';
import RiskProfile from '../RiskProfile';

export default class CalculatesRiskPointsByDependents {
  constructor(
    private readonly addRiskPointForEligibleInsurances: ModifyRiskPoints,
    private readonly logger: LoggerDTO,
  ) { }

  async execute(user: User, riskProfile: RiskProfile): Promise<void> {
    if (user.dependents) {
      await this.addRiskPointForEligibleInsurances.execute(
        SuitabilityRiskProfileNames.Disability,
        AvailableRiskPoints.One,
        riskProfile,
      );

      await this.addRiskPointForEligibleInsurances.execute(
        SuitabilityRiskProfileNames.Life,
        AvailableRiskPoints.One,
        riskProfile,
      );

      await this.logger.info(`${AvailableRiskPoints.One} risk points were add from ${SuitabilityRiskProfileNames.Disability} and ${SuitabilityRiskProfileNames.Life} insurance because the user has dependents.`);
    }
  }
}

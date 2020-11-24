import { LoggerDTO } from '@domain/shared/Contracts';
import { User } from '@domain/user';
import { AvailableRiskPoints } from '@shared/enums/AvailableRiskPoints';
import { SuitabilityRiskProfileNames } from '@shared/enums/SuitabilityRiskProfileNames';
import { UserMaritalStatus } from '@shared/enums/UserMaritalStatus';
import { ModifyRiskPoints } from '../Repository';
import RiskProfile from '../RiskProfile';

export default class CalculatesRiskPointsByMaritalStatus {
  constructor(
    private readonly addRiskPointForEligibleInsurances: ModifyRiskPoints,
    private readonly deductRiskPointForEligibleInsurances: ModifyRiskPoints,
    private readonly logger: LoggerDTO,
  ) { }

  async execute(user: User, riskProfile: RiskProfile): Promise<void> {
    if (user.marital_status === UserMaritalStatus.DomesticPartnership) {
      await this.addRiskPointForEligibleInsurances.execute(
        SuitabilityRiskProfileNames.Life,
        AvailableRiskPoints.Four,
        riskProfile,
      );

      await this.deductRiskPointForEligibleInsurances.execute(
        SuitabilityRiskProfileNames.Disability,
        AvailableRiskPoints.One,
        riskProfile,
      );

      await this.logger.info(`${AvailableRiskPoints.One} risk points were add from ${SuitabilityRiskProfileNames.Life} insurance and ${AvailableRiskPoints.One} deducted from ${SuitabilityRiskProfileNames.Disability} because the user is married.`);
    }

    if (user.marital_status === UserMaritalStatus.Married) {
      await this.addRiskPointForEligibleInsurances.execute(
        SuitabilityRiskProfileNames.Life,
        AvailableRiskPoints.One,
        riskProfile,
      );

      await this.deductRiskPointForEligibleInsurances.execute(
        SuitabilityRiskProfileNames.Disability,
        AvailableRiskPoints.One,
        riskProfile,
      );

      await this.logger.info(`${AvailableRiskPoints.One} risk points were add from ${SuitabilityRiskProfileNames.Life} insurance and ${AvailableRiskPoints.One} deducted from ${SuitabilityRiskProfileNames.Disability} because the user is married.`);
    }
  }
}

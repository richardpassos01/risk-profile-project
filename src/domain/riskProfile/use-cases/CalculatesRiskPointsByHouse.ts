import { LoggerDTO } from '@domain/shared/Contracts';
import { User } from '@domain/user';
import { AvailableRiskPoints } from '@shared/enums/AvailableRiskPoints';
import { SuitabilityRiskProfileNames } from '@shared/enums/SuitabilityRiskProfileNames';
import { UserHomeOwnerShipStatus } from '@shared/enums/UserHomeOwnerShipStatus';
import { ModifyRiskPoints } from '../Repository';
import RiskProfile from '../RiskProfile';

export default class CalculatesRiskPointsByHouse {
  constructor(
    private readonly addRiskPointForEligibleInsurances: ModifyRiskPoints,
    private readonly logger: LoggerDTO,
  ) { }

  async execute(user: User, riskProfile: RiskProfile): Promise<void> {
    const userHouseIsMortgaged = user.house
      && user.house.ownership_status === UserHomeOwnerShipStatus.Mortgaged;

    if (userHouseIsMortgaged) {
      await this.addRiskPointForEligibleInsurances.execute(
        SuitabilityRiskProfileNames.Home,
        AvailableRiskPoints.One,
        riskProfile,
      );

      await this.addRiskPointForEligibleInsurances.execute(
        SuitabilityRiskProfileNames.Disability,
        AvailableRiskPoints.One,
        riskProfile,
      );

      await this.logger.info(`${AvailableRiskPoints.One} risk points were add from ${SuitabilityRiskProfileNames.Home} and ${SuitabilityRiskProfileNames.Disability} insurance because user house is mortgaged.`);
    }
  }
}

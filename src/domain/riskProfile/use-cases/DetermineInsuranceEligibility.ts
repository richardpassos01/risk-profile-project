import { LoggerDTO } from '@domain/shared/Contracts';
import { User } from '@domain/user';
import { SuitabilityRiskProfileNames } from '@shared/enums/SuitabilityRiskProfileNames';
import { UserDefinitionByQuantityYears } from '@shared/enums/UserDefinitionByQuantityYears';
import RiskProfile from '../RiskProfile';

export default class DetermineInsuranceEligibility {
  constructor(
    private readonly logger: LoggerDTO,
  ) { }

  async execute(user: User, riskProfile: RiskProfile): Promise<void> {
    await this.determineByAge(user, riskProfile);

    await this.determineByIncome(user, riskProfile);

    await this.determineByVehicle(user, riskProfile);

    await this.determineByHouse(user, riskProfile);
  }

  private async determineByIncome(user: User, riskProfile: RiskProfile) {
    if (!user.income) {
      riskProfile.disability.isEligible = false;
      await this.logger.info(`${SuitabilityRiskProfileNames.Disability} insurance is not eligible because the user has no income`);
    }
  }

  private async determineByVehicle(user: User, riskProfile: RiskProfile) {
    if (!user.vehicle) {
      riskProfile.auto.isEligible = false;
      await this.logger.info(`${SuitabilityRiskProfileNames.Auto} insurance is not eligible because the user has no vehicle`);
    }
  }

  private async determineByHouse(user: User, riskProfile: RiskProfile) {
    if (!user.house) {
      riskProfile.home.isEligible = false;
      await this.logger.info(`${SuitabilityRiskProfileNames.Home} insurance is not eligible because the user has no home`);
    }
  }

  private async determineByAge(user: User, riskProfile: RiskProfile) {
    if (user.age > UserDefinitionByQuantityYears.Senior) {
      riskProfile.disability.isEligible = false;
      riskProfile.life.isEligible = false;
      await this.logger.info(`${SuitabilityRiskProfileNames.Disability} and ${SuitabilityRiskProfileNames.Life} insurance is not eligible because the user is over ${UserDefinitionByQuantityYears.Senior} years old`);
    }
  }
}

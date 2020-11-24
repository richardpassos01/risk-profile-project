import { InsuranceSuitabilityName, LimitRiskPointsToSuitability } from '@shared/enums/InsuranceSuitability';
import RiskProfile, { Insurance, SuitabilityRiskProfile } from '../RiskProfile';

export default class CreateSuitabilityOfRiskProfile {
  async execute(riskProfile: RiskProfile): Promise<SuitabilityRiskProfile> {
    const suitabilityOfRiskProfile = {
      auto: await this.createSuitability(riskProfile.auto),
      disability: await this.createSuitability(riskProfile.disability),
      renters: await this.createSuitability(riskProfile.renters),
      home: await this.createSuitability(riskProfile.home),
      life: await this.createSuitability(riskProfile.life),
    };

    return suitabilityOfRiskProfile;
  }

  private async createSuitability(insurance: Insurance): Promise<string> {
    if (!insurance.isEligible) {
      return InsuranceSuitabilityName.Ineligible;
    }

    if (insurance.riskPoint <= LimitRiskPointsToSuitability.Economic) {
      return InsuranceSuitabilityName.Economic;
    }

    if (insurance.riskPoint >= LimitRiskPointsToSuitability.Responsible) {
      return InsuranceSuitabilityName.Responsible;
    }

    return InsuranceSuitabilityName.Regular;
  }
}

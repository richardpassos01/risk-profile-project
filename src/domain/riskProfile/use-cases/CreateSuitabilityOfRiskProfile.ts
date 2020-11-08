import { InsuranceSuitabilityName, LimitRiskPointsToSuitability } from '@shared/enums/InsuranceSuitability';
import { Creatable } from '../Repository';
import RiskProfile, { Insurance, SuitabilityRiskProfile } from '../RiskProfile';

export default class CreateSuitabilityOfRiskProfile {
  constructor(
    private readonly creator: Creatable,
  ) { }

  async execute(riskProfile: RiskProfile): Promise<SuitabilityRiskProfile> {
    const suitabilityOfRiskProfile = {
      auto: await this.createSuitability(riskProfile.auto),
      disability: await this.createSuitability(riskProfile.disability),
      home: await this.createSuitability(riskProfile.home),
      life: await this.createSuitability(riskProfile.life),
    };

    await this.creator.create({
      id: riskProfile.id,
      user_id: riskProfile.user_id,
      ...suitabilityOfRiskProfile,
    });

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

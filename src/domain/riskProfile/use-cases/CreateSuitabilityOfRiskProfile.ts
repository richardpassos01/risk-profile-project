import { NextFunction } from 'express';
import { EventEmitter } from '@domain/shared/Contracts';
import { Events } from '@shared/enums/Events';
import { InsuranceSuitabilityName, LimitRiskPointsToSuitability } from '@shared/enums/InsuranceSuitability';
import { Creatable } from '../Repository';
import RiskProfile, { Insurance } from '../RiskProfile';

interface CreateRiskProfileEvent {
  riskProfile: RiskProfile;
  finish: NextFunction;
}

export default class CreateSuitabilityOfRiskProfile {
  constructor(
    private readonly eventEmitter: EventEmitter<CreateRiskProfileEvent>,
    private readonly creator: Creatable,
  ) { }

  listener(): void {
    this.eventEmitter.on(Events.CreateSuitabilityOfRiskProfile, (data) => {
      this.execute(data);
    });
  }

  async execute({ riskProfile, finish }: CreateRiskProfileEvent): Promise<void> {
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

    return finish(suitabilityOfRiskProfile);
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

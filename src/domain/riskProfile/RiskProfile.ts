export interface Insurance {
  isEligible: boolean;
  riskPoint: number;
}

export interface SuitabilityRiskProfile {
  auto: string;
  disability: string;
  home: string;
  life: string;
  renters: string;
}

export default class RiskProfile {
  public readonly id: number;

  public auto: Insurance;

  public disability: Insurance;

  public home: Insurance;

  public life: Insurance;

  public renters: Insurance;

  constructor(baseScore: number, baseEligibleStatus = false) {
    this.auto = {
      isEligible: baseEligibleStatus,
      riskPoint: baseScore,
    };

    this.disability = {
      isEligible: baseEligibleStatus,
      riskPoint: baseScore,
    };

    this.home = {
      isEligible: baseEligibleStatus,
      riskPoint: baseScore,
    };

    this.life = {
      isEligible: baseEligibleStatus,
      riskPoint: baseScore,
    };

    this.renters = {
      isEligible: baseEligibleStatus,
      riskPoint: baseScore,
    };
  }
}

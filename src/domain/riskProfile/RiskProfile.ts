import { FinishedCallback } from '@domain/shared/Contracts';
import { UserDTO } from '@domain/user';
import { v4 as uuid } from 'uuid';

export interface CreateRiskProfileEvent {
  user: UserDTO;
  riskProfile: RiskProfile,
  finish: FinishedCallback;
}
export interface Insurance {
  isEligible: boolean;
  riskPoint: number;
}

export interface SuitabilityRiskProfile {
  id?: string;
  user_id?: string;
  auto: string;
  disability: string;
  home: string;
  life: string;
}

export interface RiskProfileDTO {
  id?: string;
  userId: string;
  baseScore: number;
  baseEligibleStatus: boolean;
}

export default class RiskProfile {
  public readonly id: string;

  public user_id: string;

  public auto: Insurance;

  public disability: Insurance;

  public home: Insurance;

  public life: Insurance;

  constructor(props: RiskProfileDTO) {
    this.auto = {
      isEligible: props.baseEligibleStatus,
      riskPoint: props.baseScore,
    };

    this.disability = {
      isEligible: props.baseEligibleStatus,
      riskPoint: props.baseScore,
    };

    this.home = {
      isEligible: props.baseEligibleStatus,
      riskPoint: props.baseScore,
    };

    this.life = {
      isEligible: props.baseEligibleStatus,
      riskPoint: props.baseScore,
    };

    this.user_id = props.userId;

    if (!props.id) {
      this.id = uuid();
    }
  }
}

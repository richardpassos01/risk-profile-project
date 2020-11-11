import { User, UserDTO, UserRiskQuestions } from '@domain/user';
import {
  GenericCreatable,
  GenericFetchable,
  GenericUseCaseSingleParam,
  GenericUseCaseDoubleParam,
  GenericUseCaseTripleParam,
  FinishedCallback,
} from '../shared/Contracts';

import RiskProfile, { SuitabilityRiskProfile } from './RiskProfile';

export type Creatable = GenericCreatable<SuitabilityRiskProfile>;

export type Fetchable = GenericFetchable<string, SuitabilityRiskProfile[]>;

export type CalculateScore = GenericUseCaseSingleParam<UserRiskQuestions, number>;

export type ProviderOfSuitability = GenericUseCaseSingleParam<RiskProfile, SuitabilityRiskProfile>;

export type CalculateRisk = GenericUseCaseDoubleParam<User, RiskProfile, void>;

export type DetermineEligibility = GenericUseCaseDoubleParam<User, RiskProfile, void>;

export type ModifyRiskPoints = GenericUseCaseTripleParam<string, number, RiskProfile, void>;

export interface DataAcceptOnEvent {
  user: UserDTO;
  riskProfile: RiskProfile;
  finish: FinishedCallback;
}

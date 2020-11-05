import { User, UserRiskQuestions } from '@domain/user';
import {
  GenericCreatable,
  GenericUseCaseSingleParam,
  GenericUseCaseDoubleParam,
  GenericUseCaseTripleParam,
} from '../shared/Contracts';

import RiskProfile, { SuitabilityRiskProfile } from './RiskProfile';

export type Creatable = GenericCreatable<SuitabilityRiskProfile>;

export type CalculateScore = GenericUseCaseSingleParam<UserRiskQuestions, number>;

export type ProviderOfSuitability = GenericUseCaseSingleParam<RiskProfile, SuitabilityRiskProfile>;

export type CalculateRisk = GenericUseCaseDoubleParam<User, RiskProfile, void>;

export type DetermineEligibility = GenericUseCaseDoubleParam<User, RiskProfile, void>;

export type ModifyRiskPoints = GenericUseCaseTripleParam<string, number, RiskProfile, void>;

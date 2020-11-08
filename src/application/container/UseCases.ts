import * as RiskProfile from '@domain/riskProfile';
import * as User from '@domain/user';
import { Logger } from '../logger';
import {
  userCreator,
  userFetcher,
  riskProfileCreator,
  riskProfileFetcher,
} from './Repository';

const logger = new Logger();

export const createUser = new User.UseCases.Create(
  userCreator(),
);

export const fetcherUser = new User.UseCases.Fetch(
  userFetcher(),
);

export const fetcherRiskProfile = new RiskProfile.UseCases.Fetch(
  riskProfileFetcher(),
);

export const addRiskPointForEligibleInsurances = new RiskProfile.UseCases
  .AddRiskPointForEligibleInsurances();

export const deductRiskPointForEligibleInsurances = new RiskProfile.UseCases
  .DeductRiskPointForEligibleInsurances();

export const calculatesBaseScoreByRiskQuestions = new RiskProfile.UseCases
  .CalculatesBaseScoreByRiskQuestions(
    logger,
  );

export const calculatesRiskPointsByAge = new RiskProfile.UseCases
  .CalculatesRiskPointsByAge(
    deductRiskPointForEligibleInsurances,
    logger,
  );

export const calculatesRiskPointsByDependents = new RiskProfile.UseCases
  .CalculatesRiskPointsByDependents(
    addRiskPointForEligibleInsurances,
    logger,
  );

export const calculatesRiskPointsByHouse = new RiskProfile.UseCases
  .CalculatesRiskPointsByHouse(
    addRiskPointForEligibleInsurances,
    logger,
  );

export const calculatesRiskPointsByIncome = new RiskProfile.UseCases
  .CalculatesRiskPointsByIncome(
    deductRiskPointForEligibleInsurances,
    logger,
  );

export const calculatesRiskPointsByMaritalStatus = new RiskProfile.UseCases
  .CalculatesRiskPointsByMaritalStatus(
    addRiskPointForEligibleInsurances,
    deductRiskPointForEligibleInsurances,
    logger,
  );

export const calculatesRiskPointsByVehicle = new RiskProfile.UseCases
  .CalculatesRiskPointsByVehicle(
    addRiskPointForEligibleInsurances,
    logger,
  );

export const determineInsuranceEligibility = new RiskProfile.UseCases
  .DetermineInsuranceEligibility(
    logger,
  );

export const createSuitabilityOfRiskProfile = new RiskProfile.UseCases
  .CreateSuitabilityOfRiskProfile(
    riskProfileCreator(),
  );

export const provideRiskProfileForInsurances = new RiskProfile.UseCases
  .ProvideRiskProfileForInsurances(
    fetcherUser,
    calculatesBaseScoreByRiskQuestions,
    determineInsuranceEligibility,
    createSuitabilityOfRiskProfile,
    calculatesRiskPointsByAge,
    calculatesRiskPointsByIncome,
    calculatesRiskPointsByHouse,
    calculatesRiskPointsByDependents,
    calculatesRiskPointsByMaritalStatus,
    calculatesRiskPointsByVehicle,
    logger,
  );

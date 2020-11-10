import * as RiskProfile from '@domain/riskProfile';
import * as User from '@domain/user';
import { Logger } from '../logger';
import {
  userCreator,
  userFetcher,
  riskProfileCreator,
  riskProfileFetcher,
} from './Repository';
import { eventEmitter } from './EventEmitter';

const logger = new Logger();

export const createUser = new User.UseCases.Create(
  userCreator(),
);

export const fetcherUser = new User.UseCases.Fetch(
  eventEmitter,
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
    eventEmitter,
    logger,
  );

export const calculatesRiskPointsByAge = new RiskProfile.UseCases
  .CalculatesRiskPointsByAge(
    eventEmitter,
    deductRiskPointForEligibleInsurances,
    logger,
  );

export const calculatesRiskPointsByDependents = new RiskProfile.UseCases
  .CalculatesRiskPointsByDependents(
    eventEmitter,
    addRiskPointForEligibleInsurances,
    logger,
  );

export const calculatesRiskPointsByHouse = new RiskProfile.UseCases
  .CalculatesRiskPointsByHouse(
    eventEmitter,
    addRiskPointForEligibleInsurances,
    logger,
  );

export const calculatesRiskPointsByIncome = new RiskProfile.UseCases
  .CalculatesRiskPointsByIncome(
    eventEmitter,
    deductRiskPointForEligibleInsurances,
    logger,
  );

export const calculatesRiskPointsByMaritalStatus = new RiskProfile.UseCases
  .CalculatesRiskPointsByMaritalStatus(
    eventEmitter,
    addRiskPointForEligibleInsurances,
    deductRiskPointForEligibleInsurances,
    logger,
  );

export const calculatesRiskPointsByVehicle = new RiskProfile.UseCases
  .CalculatesRiskPointsByVehicle(
    eventEmitter,
    addRiskPointForEligibleInsurances,
    logger,
  );

export const determineInsuranceEligibility = new RiskProfile.UseCases
  .DetermineInsuranceEligibility(
    eventEmitter,
    logger,
  );

export const createSuitabilityOfRiskProfile = new RiskProfile.UseCases
  .CreateSuitabilityOfRiskProfile(
    eventEmitter,
    riskProfileCreator(),
  );

export const createRiskProfileByBaseScoreAndUser = new RiskProfile.UseCases
  .CreateRiskProfileByBaseScoreAndUser(
    eventEmitter,
    logger,
  );

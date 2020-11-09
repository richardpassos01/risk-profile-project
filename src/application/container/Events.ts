import { EventEmitter } from '@infrastructure/event';
import * as UseCases from './UseCases';

export const registerEvents = (): void => {
  UseCases.calculatesBaseScoreByRiskQuestions.listener();
  UseCases.createRiskProfileByBaseScoreAndUser.listener();
  UseCases.calculatesRiskPointsByAge.listener();
  UseCases.calculatesRiskPointsByDependents.listener();
  UseCases.calculatesRiskPointsByHouse.listener();
  UseCases.calculatesRiskPointsByIncome.listener();
  UseCases.calculatesRiskPointsByMaritalStatus.listener();
  UseCases.calculatesRiskPointsByVehicle.listener();
  UseCases.determineInsuranceEligibility.listener();
  UseCases.createSuitabilityOfRiskProfile.listener();
  UseCases.createRiskProfileByBaseScoreAndUser.listener();
};

export const eventEmitter = EventEmitter.getInstance();

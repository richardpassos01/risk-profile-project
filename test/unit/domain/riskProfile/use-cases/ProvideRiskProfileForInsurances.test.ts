import {
  CalculateRisk,
  CalculateScore,
  ProviderOfSuitability,
} from '@domain/riskProfile/Repository';
import ProvideRiskProfileForInsurances from '@domain/riskProfile/use-cases/ProvideRiskProfileForInsurances';
import { User } from '@domain/user';
import {
  mockLogger,
  mockCalculatesBaseScoreByRiskQuestions,
  mockCreateSuitabilityBasedOnRiskProfile,
  mockDefaultCalculateRisk,
  userMock,
  mockUseCaseDefault,
  mockUseCaseDefaultError,
} from '@test/mock';

describe('ProvideRiskProfileForInsurances', () => {
  let provideRiskProfileForInsurances: ProvideRiskProfileForInsurances;
  let calculatesBaseScoreByRiskQuestions: CalculateScore;
  let createSuitabilityBasedOnRiskProfile: ProviderOfSuitability;
  let calculatesRiskPointsByAge: CalculateRisk;
  let calculatesRiskPointsByIncome: CalculateRisk;
  let calculatesRiskPointsByHouse: CalculateRisk;
  let calculatesRiskPointsByDependents: CalculateRisk;
  let calculatesRiskPointsByMaritalStatus: CalculateRisk;
  let calculatesRiskPointsByVehicle: CalculateRisk;
  let user: User;

  beforeEach(() => {
    user = {
      ...userMock,
    };

    calculatesBaseScoreByRiskQuestions = mockCalculatesBaseScoreByRiskQuestions;
    createSuitabilityBasedOnRiskProfile = mockCreateSuitabilityBasedOnRiskProfile;
    calculatesRiskPointsByAge = mockDefaultCalculateRisk;
    calculatesRiskPointsByIncome = mockDefaultCalculateRisk;
    calculatesRiskPointsByHouse = mockDefaultCalculateRisk;
    calculatesRiskPointsByDependents = mockDefaultCalculateRisk;
    calculatesRiskPointsByMaritalStatus = mockDefaultCalculateRisk;
    calculatesRiskPointsByVehicle = mockDefaultCalculateRisk;
  });

  test('Should not call use cases to calculate risk points when all user insurances is ineligible', async () => {
    const determineInsuranceEligibility = mockUseCaseDefault;

    provideRiskProfileForInsurances = new ProvideRiskProfileForInsurances(
      calculatesBaseScoreByRiskQuestions,
      determineInsuranceEligibility,
      createSuitabilityBasedOnRiskProfile,
      calculatesRiskPointsByAge,
      calculatesRiskPointsByIncome,
      calculatesRiskPointsByHouse,
      calculatesRiskPointsByDependents,
      calculatesRiskPointsByMaritalStatus,
      calculatesRiskPointsByVehicle,
      mockLogger,
    );

    const spy = jest.spyOn(provideRiskProfileForInsurances, 'checkInsuranceEligibility');
    spy.mockResolvedValue(false);

    await provideRiskProfileForInsurances.execute(user);

    expect(mockLogger.info).toHaveBeenCalled();
    expect(mockLogger.info).toHaveBeenCalledWith('All insurance is not eligible for the user');

    expect(createSuitabilityBasedOnRiskProfile.execute).toHaveBeenCalled();
  });

  test('Should call use cases to calculate risk points when user has at least one eligible insurance', async () => {
    const determineInsuranceEligibility = mockUseCaseDefault;

    provideRiskProfileForInsurances = new ProvideRiskProfileForInsurances(
      calculatesBaseScoreByRiskQuestions,
      determineInsuranceEligibility,
      createSuitabilityBasedOnRiskProfile,
      calculatesRiskPointsByAge,
      calculatesRiskPointsByIncome,
      calculatesRiskPointsByHouse,
      calculatesRiskPointsByDependents,
      calculatesRiskPointsByMaritalStatus,
      calculatesRiskPointsByVehicle,
      mockLogger,
    );

    const spy = jest.spyOn(provideRiskProfileForInsurances, 'checkInsuranceEligibility');
    spy.mockResolvedValue(true);

    await provideRiskProfileForInsurances.execute(user);

    expect(mockLogger.info).toHaveBeenCalled();
    expect(mockLogger.info).toHaveBeenCalledWith('Risk points calculated and ready to create the suitability of the risk profile');

    expect(createSuitabilityBasedOnRiskProfile.execute).toHaveBeenCalled();
  });

  test('Should handler error and return details if exists.', async () => {
    const determineInsuranceEligibility = mockUseCaseDefaultError;

    provideRiskProfileForInsurances = new ProvideRiskProfileForInsurances(
      calculatesBaseScoreByRiskQuestions,
      determineInsuranceEligibility,
      createSuitabilityBasedOnRiskProfile,
      calculatesRiskPointsByAge,
      calculatesRiskPointsByIncome,
      calculatesRiskPointsByHouse,
      calculatesRiskPointsByDependents,
      calculatesRiskPointsByMaritalStatus,
      calculatesRiskPointsByVehicle,
      mockLogger,
    );

    await expect(provideRiskProfileForInsurances.execute(user)).rejects
      .toThrow('Unexpected error when providing user suitability');
  });
});

import { RiskProfile } from '@domain/riskProfile';
import CreateSuitabilityOfRiskProfile from '@domain/riskProfile/use-cases/CreateSuitabilityOfRiskProfile';

describe('CreateSuitabilityOfRiskProfile', () => {
  let createSuitabilityOfRiskProfile: CreateSuitabilityOfRiskProfile;
  let baseScore: number;

  beforeAll(() => {
    baseScore = 0;
    createSuitabilityOfRiskProfile = new CreateSuitabilityOfRiskProfile();
  });

  test('Should create suitability ineligible for ineligible insurances', async () => {
    const mockRiskProfile = new RiskProfile(baseScore, false);

    const expectedResult = {
      auto: 'ineligible',
      disability: 'ineligible',
      home: 'ineligible',
      life: 'ineligible',
    };

    const result = await createSuitabilityOfRiskProfile.execute(mockRiskProfile);

    expect(result).toEqual(expectedResult);
  });

  test('Should create suitability economic for insurances with 0 or less risk points', async () => {
    const mockRiskProfile = new RiskProfile(baseScore, true);

    const expectedResult = {
      auto: 'economic',
      disability: 'economic',
      home: 'economic',
      life: 'economic',
    };

    const result = await createSuitabilityOfRiskProfile.execute(mockRiskProfile);

    expect(result).toEqual(expectedResult);
  });

  test('Should create suitability regular for insurances with 1 or 2 risk points', async () => {
    const mockRiskProfile = new RiskProfile(2, true);

    const expectedResult = {
      auto: 'regular',
      disability: 'regular',
      home: 'regular',
      life: 'regular',
    };

    const result = await createSuitabilityOfRiskProfile.execute(mockRiskProfile);

    expect(result).toEqual(expectedResult);
  });

  test('Should create suitability responsible for insurances with 3 or more risk points', async () => {
    const mockRiskProfile = new RiskProfile(3, true);

    const expectedResult = {
      auto: 'responsible',
      disability: 'responsible',
      home: 'responsible',
      life: 'responsible',
    };

    const result = await createSuitabilityOfRiskProfile.execute(mockRiskProfile);

    expect(result).toEqual(expectedResult);
  });
});

import { RiskProfile } from '@domain/riskProfile';
import DeductRiskPointForEligibleInsurances from '@domain/riskProfile/use-cases/DeductRiskPointForEligibleInsurances';

describe('DeductRiskPointForEligibleInsurances', () => {
  let deductRiskPointForEligibleInsurances: DeductRiskPointForEligibleInsurances;
  let riskProfile: RiskProfile;
  let baseScore: number;

  beforeAll(() => {
    baseScore = 0;
    deductRiskPointForEligibleInsurances = new DeductRiskPointForEligibleInsurances();
  });

  test('Should deduct risk points for any insurance eligible', async () => {
    riskProfile = new RiskProfile(baseScore, true);
    const insurance = 'auto';
    const point = 1;

    await deductRiskPointForEligibleInsurances.execute(insurance, point, riskProfile);

    expect(riskProfile.auto.riskPoint).toBe(-1);
  });

  test('Should not deduct risk points for any insurance ineligible', async () => {
    riskProfile = new RiskProfile(baseScore, false);
    const insurance = 'disability';
    const point = 1;

    await deductRiskPointForEligibleInsurances.execute(insurance, point, riskProfile);

    expect(riskProfile.disability.riskPoint).toBe(0);
  });
});

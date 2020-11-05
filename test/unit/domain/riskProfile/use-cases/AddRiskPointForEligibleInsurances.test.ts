import { RiskProfile } from '@domain/riskProfile';
import AddRiskPointForEligibleInsurances from '@domain/riskProfile/use-cases/AddRiskPointForEligibleInsurances';

describe('AddRiskPointForEligibleInsurances', () => {
  let addRiskPointForEligibleInsurances: AddRiskPointForEligibleInsurances;
  let riskProfile: RiskProfile;
  let baseScore: number;

  beforeAll(() => {
    baseScore = 0;
    addRiskPointForEligibleInsurances = new AddRiskPointForEligibleInsurances();
  });

  test('Should not add risk points for any insurance ineligible', async () => {
    riskProfile = new RiskProfile(baseScore, true);
    const insurance = 'home';
    const point = 1;

    await addRiskPointForEligibleInsurances.execute(insurance, point, riskProfile);

    expect(riskProfile.home.riskPoint).toBe(1);
  });

  test('Should not add risk points for any insurance ineligible', async () => {
    riskProfile = new RiskProfile(baseScore, false);
    const insurance = 'life';
    const point = 1;

    await addRiskPointForEligibleInsurances.execute(insurance, point, riskProfile);

    expect(riskProfile.life.riskPoint).toBe(0);
  });
});

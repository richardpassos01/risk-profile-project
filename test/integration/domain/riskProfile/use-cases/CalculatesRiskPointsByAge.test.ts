import CalculatesRiskPointsByAge from '@domain/riskProfile/use-cases/CalculatesRiskPointsByAge';
import DeductRiskPointForEligibleInsurances from '@domain/riskProfile/use-cases/DeductRiskPointForEligibleInsurances';
import { RiskProfile } from '@domain/riskProfile';
import { User } from '@domain/user';
import { userMock, mockLogger } from '@test/mock';

describe('CalculatesRiskPointsByAge', () => {
  let calculatesRiskPointsByAge: CalculatesRiskPointsByAge;
  let deductRiskPointForEligibleInsurances: DeductRiskPointForEligibleInsurances;
  let riskProfile: RiskProfile;
  let baseScore: number;
  let user: User;

  beforeEach(() => {
    baseScore = 1;
    user = {
      ...userMock,
    };

    riskProfile = new RiskProfile(baseScore, true);
    deductRiskPointForEligibleInsurances = new DeductRiskPointForEligibleInsurances();
    calculatesRiskPointsByAge = new CalculatesRiskPointsByAge(
      deductRiskPointForEligibleInsurances,
      mockLogger,
    );
  });

  test('Should return undefined if user is over 40 years old,', async () => {
    user.age = 41;

    const result = await calculatesRiskPointsByAge.execute(user, riskProfile);

    expect(result).toBeUndefined();
  });

  test('Should deduct 2 risk points from all lines of insurance to user under 30 years old.', async () => {
    user.age = 25;

    await calculatesRiskPointsByAge.execute(user, riskProfile);

    expect(riskProfile.auto.riskPoint).toBe(-1);
    expect(riskProfile.home.riskPoint).toBe(-1);
    expect(riskProfile.disability.riskPoint).toBe(-1);
    expect(riskProfile.life.riskPoint).toBe(-1);
  });

  test('Should deduct 1 risk points from all lines of insurance to user between 30 and 40 years old.', async () => {
    await calculatesRiskPointsByAge.execute(user, riskProfile);

    expect(riskProfile.auto.riskPoint).toBe(0);
    expect(riskProfile.home.riskPoint).toBe(0);
    expect(riskProfile.disability.riskPoint).toBe(0);
    expect(riskProfile.life.riskPoint).toBe(0);
  });
});

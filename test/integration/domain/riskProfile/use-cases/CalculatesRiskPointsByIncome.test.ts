import CalculatesRiskPointsByIncome from '@domain/riskProfile/use-cases/CalculatesRiskPointsByIncome';
import DeductRiskPointForEligibleInsurances from '@domain/riskProfile/use-cases/DeductRiskPointForEligibleInsurances';
import { RiskProfile } from '@domain/riskProfile';
import { User } from '@domain/user';
import { userMock, mockLogger } from '@test/mock';

describe('CalculatesRiskPointsByIncome', () => {
  let calculatesRiskPointsByIncome: CalculatesRiskPointsByIncome;
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
    calculatesRiskPointsByIncome = new CalculatesRiskPointsByIncome(
      deductRiskPointForEligibleInsurances,
      mockLogger,
    );
  });

  test('Should not deduct points from any lines of insurance to user with income below $200k.', async () => {
    user.income = 0;

    await calculatesRiskPointsByIncome.execute(user, riskProfile);

    expect(riskProfile.home.riskPoint).toBe(1);
    expect(riskProfile.disability.riskPoint).toBe(1);
    expect(riskProfile.auto.riskPoint).toBe(1);
    expect(riskProfile.life.riskPoint).toBe(1);
  });

  test('Should deduct 1 risk point from all lines of insurance to user with income above $200k', async () => {
    user.income = 250000.00;

    await calculatesRiskPointsByIncome.execute(user, riskProfile);

    expect(riskProfile.home.riskPoint).toBe(0);
    expect(riskProfile.disability.riskPoint).toBe(0);
    expect(riskProfile.auto.riskPoint).toBe(0);
    expect(riskProfile.life.riskPoint).toBe(0);
  });
});

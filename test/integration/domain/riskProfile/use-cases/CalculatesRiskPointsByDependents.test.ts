import CalculatesRiskPointsByDependents from '@domain/riskProfile/use-cases/CalculatesRiskPointsByDependents';
import AddRiskPointForEligibleInsurances from '@domain/riskProfile/use-cases/AddRiskPointForEligibleInsurances';
import { RiskProfile } from '@domain/riskProfile';
import { User } from '@domain/user';
import { userMock, mockLogger } from '@test/mock';

describe('CalculatesRiskPointsByDependents', () => {
  let calculatesRiskPointsByDependents: CalculatesRiskPointsByDependents;
  let addRiskPointForEligibleInsurances: AddRiskPointForEligibleInsurances;
  let riskProfile: RiskProfile;
  let baseScore: number;
  let user: User;

  beforeEach(() => {
    baseScore = 1;
    user = {
      ...userMock,
    };

    riskProfile = new RiskProfile(baseScore, true);
    addRiskPointForEligibleInsurances = new AddRiskPointForEligibleInsurances();
    calculatesRiskPointsByDependents = new CalculatesRiskPointsByDependents(
      addRiskPointForEligibleInsurances,
      mockLogger,
    );
  });

  test('Should add 1 risk point to disability and life insurance to user with dependents.', async () => {
    await calculatesRiskPointsByDependents.execute(user, riskProfile);

    expect(riskProfile.disability.riskPoint).toBe(2);
    expect(riskProfile.life.riskPoint).toBe(2);
    expect(riskProfile.auto.riskPoint).toBe(1);
    expect(riskProfile.home.riskPoint).toBe(1);
  });

  test('Should not add risk points from any lines of insurance to user without dependents.', async () => {
    user.dependents = 0;

    await calculatesRiskPointsByDependents.execute(user, riskProfile);

    expect(riskProfile.disability.riskPoint).toBe(1);
    expect(riskProfile.life.riskPoint).toBe(1);
    expect(riskProfile.auto.riskPoint).toBe(1);
    expect(riskProfile.home.riskPoint).toBe(1);
  });
});

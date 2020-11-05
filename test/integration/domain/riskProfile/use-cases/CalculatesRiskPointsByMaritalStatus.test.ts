import CalculatesRiskPointsByMaritalStatus from '@domain/riskProfile/use-cases/CalculatesRiskPointsByMaritalStatus';
import AddRiskPointForEligibleInsurances from '@domain/riskProfile/use-cases/AddRiskPointForEligibleInsurances';
import DeductRiskPointForEligibleInsurances from '@domain/riskProfile/use-cases/DeductRiskPointForEligibleInsurances';
import { RiskProfile } from '@domain/riskProfile';
import { User } from '@domain/user';
import { userMock, mockLogger } from '@test/mock';

describe('CalculatesRiskPointsByMaritalStatus', () => {
  let calculatesRiskPointsByMaritalStatus: CalculatesRiskPointsByMaritalStatus;
  let addRiskPointForEligibleInsurances: AddRiskPointForEligibleInsurances;
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
    addRiskPointForEligibleInsurances = new AddRiskPointForEligibleInsurances();
    deductRiskPointForEligibleInsurances = new DeductRiskPointForEligibleInsurances();
    calculatesRiskPointsByMaritalStatus = new CalculatesRiskPointsByMaritalStatus(
      addRiskPointForEligibleInsurances,
      deductRiskPointForEligibleInsurances,
      mockLogger,
    );
  });

  test('Should add 1 risk point to the life score and remove 1 risk point from disability for married users.', async () => {
    user.marital_status = 'married';

    await calculatesRiskPointsByMaritalStatus.execute(user, riskProfile);

    expect(riskProfile.life.riskPoint).toBe(2);
    expect(riskProfile.disability.riskPoint).toBe(0);
    expect(riskProfile.home.riskPoint).toBe(1);
    expect(riskProfile.auto.riskPoint).toBe(1);
  });

  test('Should not deduct or add points from any lines of insurance to single users.', async () => {
    user.marital_status = 'single';

    await calculatesRiskPointsByMaritalStatus.execute(user, riskProfile);

    expect(riskProfile.life.riskPoint).toBe(1);
    expect(riskProfile.disability.riskPoint).toBe(1);
    expect(riskProfile.home.riskPoint).toBe(1);
    expect(riskProfile.auto.riskPoint).toBe(1);
  });
});

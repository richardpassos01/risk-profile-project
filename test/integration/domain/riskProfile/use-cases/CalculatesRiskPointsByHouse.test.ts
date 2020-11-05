import CalculatesRiskPointsByHouse from '@domain/riskProfile/use-cases/CalculatesRiskPointsByHouse';
import AddRiskPointForEligibleInsurances from '@domain/riskProfile/use-cases/AddRiskPointForEligibleInsurances';
import { RiskProfile } from '@domain/riskProfile';
import { User } from '@domain/user';
import { userMock, mockLogger } from '@test/mock';

describe('CalculatesRiskPointsByHouse', () => {
  let calculatesRiskPointsByHouse: CalculatesRiskPointsByHouse;
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
    calculatesRiskPointsByHouse = new CalculatesRiskPointsByHouse(
      addRiskPointForEligibleInsurances,
      mockLogger,
    );
  });

  test('Should add 1 risk point to home and disability insurance to user with mortgaged house.', async () => {
    user.house.ownership_status = 'mortgaged';

    await calculatesRiskPointsByHouse.execute(user, riskProfile);

    expect(riskProfile.home.riskPoint).toBe(2);
    expect(riskProfile.disability.riskPoint).toBe(2);
  });

  test('Should not add 1 risk point to home and disability insurance to user owner of house.', async () => {
    user.house.ownership_status = 'owned';

    await calculatesRiskPointsByHouse.execute(user, riskProfile);

    expect(riskProfile.home.riskPoint).toBe(1);
    expect(riskProfile.disability.riskPoint).toBe(1);
  });
});

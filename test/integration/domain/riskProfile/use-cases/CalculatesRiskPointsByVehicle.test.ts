import CalculatesRiskPointsByVehicle from '@domain/riskProfile/use-cases/CalculatesRiskPointsByVehicle';
import AddRiskPointForEligibleInsurances from '@domain/riskProfile/use-cases/AddRiskPointForEligibleInsurances';
import { RiskProfile } from '@domain/riskProfile';
import { User } from '@domain/user';
import { userMock, mockLogger } from '@test/mock';

describe('CalculatesRiskPointsByVehicle', () => {
  let calculatesRiskPointsByVehicle: CalculatesRiskPointsByVehicle;
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
    calculatesRiskPointsByVehicle = new CalculatesRiskPointsByVehicle(
      addRiskPointForEligibleInsurances,
      mockLogger,
    );
  });

  test('Should add 1 risk point to the vehicles Auto insurance that was produced in the last 5 years', async () => {
    user.vehicle.year = 2019;

    await calculatesRiskPointsByVehicle.execute(user, riskProfile);

    expect(riskProfile.auto.riskPoint).toBe(2);
  });

  test('Should not add risk points to the Auto insurance to vehicle with more than 5 years of production', async () => {
    user.vehicle.year = 1995;

    const result = await calculatesRiskPointsByVehicle.execute(user, riskProfile);

    expect(riskProfile.auto.riskPoint).toBe(1);
    expect(result).toBeUndefined();
  });

  test('Should return undefined if the user does not have a vehicle', async () => {
    user.vehicle = null;

    const result = await calculatesRiskPointsByVehicle.execute(user, riskProfile);

    expect(result).toBeUndefined();
  });
});

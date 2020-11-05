import { RiskProfile } from '@domain/riskProfile';
import DetermineInsuranceEligibility from '@domain/riskProfile/use-cases/DetermineInsuranceEligibility';
import {
  userMock,
  mockLogger,
} from '@test/mock';

describe('DetermineInsuranceEligibility', () => {
  let determineInsuranceEligibility: DetermineInsuranceEligibility;
  let riskProfile: RiskProfile;
  let baseScore: number;

  beforeEach(() => {
    baseScore = 1;
    riskProfile = new RiskProfile(baseScore, true);
    determineInsuranceEligibility = new DetermineInsuranceEligibility(
      mockLogger,
    );
  });

  test('Should set disability insurance to be eligible when the user has no income', async () => {
    const { income, ...user } = userMock;
    const userWithoutIncome = {
      ...user,
      income: 0,
    };

    await determineInsuranceEligibility.execute(userWithoutIncome, riskProfile);

    expect(riskProfile.disability.isEligible).toBeFalsy();
  });

  test('Should set auto insurance to be eligible when the user has no vehicle', async () => {
    const { vehicle, ...user } = userMock;
    const userWithoutVehicle = {
      ...user,
    };

    await determineInsuranceEligibility.execute(userWithoutVehicle, riskProfile);

    expect(riskProfile.auto.isEligible).toBeFalsy();
  });

  test('Should set home insurance to be eligible when the user has no house', async () => {
    const { house, ...user } = userMock;
    const userWithoutHouse = {
      ...user,
    };

    await determineInsuranceEligibility.execute(userWithoutHouse, riskProfile);

    expect(riskProfile.home.isEligible).toBeFalsy();
  });

  test('Should set disability and life insurance to be eligible when user is over 60 years old,', async () => {
    const { age, ...user } = userMock;
    const seniorUser = {
      ...user,
      age: 65,
    };

    await determineInsuranceEligibility.execute(seniorUser, riskProfile);

    expect(riskProfile.disability.isEligible).toBeFalsy();
    expect(riskProfile.life.isEligible).toBeFalsy();
  });
});

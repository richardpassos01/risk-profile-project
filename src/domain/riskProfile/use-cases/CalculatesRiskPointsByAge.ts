import { LoggerDTO } from '@domain/shared/Contracts';
import { User } from '@domain/user';
import { AvailableRiskPoints } from '@shared/enums/AvailableRiskPoints';
import { UserDefinitionByQuantityYears } from '@shared/enums/UserDefinitionByQuantityYears';
import { ModifyRiskPoints } from '../Repository';
import RiskProfile from '../RiskProfile';

export default class CalculatesRiskPointsByAge {
  constructor(
    private readonly deductRiskPointForEligibleInsurances: ModifyRiskPoints,
    private readonly logger: LoggerDTO,
  ) { }

  async execute(user: User, riskProfile: RiskProfile): Promise<void> {
    const isUnderTheAgeOfThirty = user.age < UserDefinitionByQuantityYears.Young;
    const isBetweenFortyAndFiftyYearsOld = user.age >= UserDefinitionByQuantityYears.Young
      && user.age <= UserDefinitionByQuantityYears.Adult;

    if (!isUnderTheAgeOfThirty && !isBetweenFortyAndFiftyYearsOld) {
      this.logger.info('User does not meet score calculation criteria');
      return;
    }

    const numberOfRiskPointsToDeduct = isUnderTheAgeOfThirty
      ? AvailableRiskPoints.Two : AvailableRiskPoints.One;

    const insurances = Object.keys(riskProfile);

    insurances.forEach((insurance) => this.deductRiskPointForEligibleInsurances.execute(
      insurance,
      numberOfRiskPointsToDeduct,
      riskProfile,
    ));

    this.logger.info(`${numberOfRiskPointsToDeduct} risk points were deducted from all insurance lines because the user is ${user.age} years old.`);
  }
}

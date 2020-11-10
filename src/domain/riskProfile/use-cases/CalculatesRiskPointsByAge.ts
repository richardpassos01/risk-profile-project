import { NextFunction } from 'express';
import { EventEmitter, LoggerDTO } from '@domain/shared/Contracts';
import { UserDTO } from '@domain/user';
import { AvailableRiskPoints } from '@shared/enums/AvailableRiskPoints';
import { Events } from '@shared/enums/Events';
import { UserDefinitionByQuantityYears } from '@shared/enums/UserDefinitionByQuantityYears';
import { ModifyRiskPoints } from '../Repository';
import RiskProfile from '../RiskProfile';

interface CreateRiskProfileEvent {
  user: UserDTO;
  riskProfile: RiskProfile;
  finish: NextFunction;
}
export default class CalculatesRiskPointsByAge {
  constructor(
    private readonly eventEmitter: EventEmitter<CreateRiskProfileEvent>,
    private readonly deductRiskPointForEligibleInsurances: ModifyRiskPoints,
    private readonly logger: LoggerDTO,
  ) {
    this.listener();
  }

  listener(): void {
    this.eventEmitter.on(Events.CalculatesRiskPointsByAge, (data) => {
      this.execute(data);
    });
  }

  async execute({ user, riskProfile, finish }: CreateRiskProfileEvent): Promise<void> {
    const isUnderTheAgeOfThirty = user.age < UserDefinitionByQuantityYears.Young;
    const isBetweenFortyAndFiftyYearsOld = user.age >= UserDefinitionByQuantityYears.Young
      && user.age <= UserDefinitionByQuantityYears.Adult;

    if (!isUnderTheAgeOfThirty && !isBetweenFortyAndFiftyYearsOld) {
      this.logger.info('User does not meet score calculation criteria');
      const data = {
        user,
        riskProfile,
        finish,
      };

      return this.eventEmitter.emit(Events.CalculatesRiskPointsByIncome, data);
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

    const data = {
      user,
      riskProfile,
      finish,
    };

    return this.eventEmitter.emit(Events.CalculatesRiskPointsByIncome, data);
  }
}

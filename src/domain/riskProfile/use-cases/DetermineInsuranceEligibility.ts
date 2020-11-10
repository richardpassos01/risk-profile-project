import { NextFunction } from 'express';
import { EventEmitter, LoggerDTO } from '@domain/shared/Contracts';
import { UserDTO } from '@domain/user';
import { Events } from '@shared/enums/Events';
import { SuitabilityRiskProfileNames } from '@shared/enums/SuitabilityRiskProfileNames';
import { UserDefinitionByQuantityYears } from '@shared/enums/UserDefinitionByQuantityYears';
import RiskProfile from '../RiskProfile';

interface CreateRiskProfileEvent {
  user: UserDTO;
  riskProfile: RiskProfile,
  finish: NextFunction;
}

export default class DetermineInsuranceEligibility {
  constructor(
    private readonly eventEmitter: EventEmitter<CreateRiskProfileEvent>,
    public readonly logger: LoggerDTO,
  ) {
    this.listener();
  }

  listener(): void {
    this.eventEmitter.on(Events.DetermineInsuranceEligibility, (data) => {
      this.execute(data);
    });
  }

  async execute({ user, riskProfile, finish }: CreateRiskProfileEvent): Promise<void> {
    await this.determineByAge(user, riskProfile);

    await this.determineByIncome(user, riskProfile);

    await this.determineByVehicle(user, riskProfile);

    await this.determineByHouse(user, riskProfile);

    const userHasEligibleInsurance = await this.checkInsuranceEligibility(riskProfile);

    if (!userHasEligibleInsurance) {
      await this.logger.info('All insurance is not eligible for the user');
      const data = {
        riskProfile,
        finish,
      };

      return this.eventEmitter.emit(Events.CreateSuitabilityOfRiskProfile, data);
    }

    const data = {
      user,
      riskProfile,
      finish,
    };

    return this.eventEmitter.emit(Events.CalculatesRiskPointsByAge, data);
  }

  private async determineByIncome(user: UserDTO, riskProfile: RiskProfile) {
    if (!user.income) {
      riskProfile.disability.isEligible = false;
      await this.logger.info(`${SuitabilityRiskProfileNames.Disability} insurance is not eligible because the user has no income`);
    }
  }

  private async determineByVehicle(user: UserDTO, riskProfile: RiskProfile) {
    if (!user.vehicle) {
      riskProfile.auto.isEligible = false;
      await this.logger.info(`${SuitabilityRiskProfileNames.Auto} insurance is not eligible because the user has no vehicle`);
    }
  }

  private async determineByHouse(user: UserDTO, riskProfile: RiskProfile) {
    if (!user.house) {
      riskProfile.home.isEligible = false;
      await this.logger.info(`${SuitabilityRiskProfileNames.Home} insurance is not eligible because the user has no home`);
    }
  }

  private async determineByAge(user: UserDTO, riskProfile: RiskProfile) {
    if (user.age > UserDefinitionByQuantityYears.Senior) {
      riskProfile.disability.isEligible = false;
      riskProfile.life.isEligible = false;
      await this.logger.info(`${SuitabilityRiskProfileNames.Disability} and ${SuitabilityRiskProfileNames.Life} insurance is not eligible because the user is over ${UserDefinitionByQuantityYears.Senior} years old`);
    }
  }

  private async checkInsuranceEligibility(riskProfile: RiskProfile): Promise<boolean> {
    const insurances = Object.keys(riskProfile);

    return !!insurances.find((insurance) => riskProfile[insurance].isEligible === true);
  }
}

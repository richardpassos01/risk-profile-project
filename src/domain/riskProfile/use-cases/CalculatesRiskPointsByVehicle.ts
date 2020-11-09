import { NextFunction } from 'express';
import { EventEmitter, LoggerDTO } from '@domain/shared/Contracts';
import { UserDTO } from '@domain/user';
import { AvailableRiskPoints } from '@shared/enums/AvailableRiskPoints';
import { Events } from '@shared/enums/Events';
import { SuitabilityRiskProfileNames } from '@shared/enums/SuitabilityRiskProfileNames';
import { VehicleSituationForYearsOfProduction } from '@shared/enums/VehicleSituationForYearsOfProduction';
import { ModifyRiskPoints } from '../Repository';
import RiskProfile from '../RiskProfile';

interface CreateRiskProfileEvent {
  user: UserDTO;
  riskProfile: RiskProfile;
  finish: NextFunction;
}
export default class CalculatesRiskPointsByVehicle {
  constructor(
    private readonly eventEmitter: EventEmitter<CreateRiskProfileEvent>,
    private readonly addRiskPointForEligibleInsurances: ModifyRiskPoints,
    private readonly logger: LoggerDTO,
  ) { }

  listener(): void {
    this.eventEmitter.on(Events.CalculatesRiskPointsByHouse, (data) => {
      this.execute(data);
    });
  }

  async execute({ user, riskProfile, finish }: CreateRiskProfileEvent): Promise<void> {
    if (!user.vehicle) {
      return this.eventEmitter.emit(Events.CreateSuitabilityOfRiskProfile, riskProfile);
    }

    const currentYear = new Date().getFullYear();
    const differenceBetweenYears = currentYear - user.vehicle.year;

    const wasProducedInTheLastFiveYears = differenceBetweenYears
      <= VehicleSituationForYearsOfProduction.new;

    if (wasProducedInTheLastFiveYears) {
      await this.addRiskPointForEligibleInsurances.execute(
        SuitabilityRiskProfileNames.Auto,
        AvailableRiskPoints.One,
        riskProfile,
      );

      await this.logger.info(`${AvailableRiskPoints.One} risk points were add from ${SuitabilityRiskProfileNames.Auto} insurance because the user s vehicle was produced in the last ${differenceBetweenYears} years.`);
    }

    const data = {
      riskProfile,
      finish,
    };

    return this.eventEmitter.emit(Events.CreateSuitabilityOfRiskProfile, data);
  }
}

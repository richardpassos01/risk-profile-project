import { LoggerDTO } from '@domain/shared/Contracts';
import { User } from '@domain/user';
import { AvailableRiskPoints } from '@shared/enums/AvailableRiskPoints';
import { SuitabilityRiskProfileNames } from '@shared/enums/SuitabilityRiskProfileNames';
import { VehicleSituationForYearsOfProduction } from '@shared/enums/VehicleSituationForYearsOfProduction';
import { ModifyRiskPoints } from '../Repository';
import RiskProfile from '../RiskProfile';

export default class CalculatesRiskPointsByVehicle {
  constructor(
    private readonly addRiskPointForEligibleInsurances: ModifyRiskPoints,
    private readonly logger: LoggerDTO,
  ) { }

  async execute(user: User, riskProfile: RiskProfile): Promise<void> {
    if (!user.vehicle) {
      return;
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
  }
}

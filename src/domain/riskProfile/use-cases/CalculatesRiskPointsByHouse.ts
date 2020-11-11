import { EventEmitter, LoggerDTO } from '@domain/shared/Contracts';
import { AvailableRiskPoints } from '@shared/enums/AvailableRiskPoints';
import { Events } from '@shared/enums/Events';
import { SuitabilityRiskProfileNames } from '@shared/enums/SuitabilityRiskProfileNames';
import { UserHomeOwnerShipStatus } from '@shared/enums/UserHomeOwnerShipStatus';
import { ModifyRiskPoints } from '../Repository';
import { CreateRiskProfileEvent } from '../RiskProfile';

export default class CalculatesRiskPointsByHouse {
  constructor(
    private readonly eventEmitter: EventEmitter<CreateRiskProfileEvent>,
    private readonly addRiskPointForEligibleInsurances: ModifyRiskPoints,
    private readonly logger: LoggerDTO,
  ) {
    this.listener();
  }

  listener(): void {
    this.eventEmitter.on(Events.CalculatesRiskPointsByHouse, (data) => {
      this.execute(data);
    });
  }

  async execute({ user, riskProfile, finish }: CreateRiskProfileEvent): Promise<void> {
    const userHouseIsMortgaged = user.house
      && user.house.ownership_status === UserHomeOwnerShipStatus.Mortgaged;

    if (userHouseIsMortgaged) {
      await this.addRiskPointForEligibleInsurances.execute(
        SuitabilityRiskProfileNames.Home,
        AvailableRiskPoints.One,
        riskProfile,
      );

      await this.addRiskPointForEligibleInsurances.execute(
        SuitabilityRiskProfileNames.Disability,
        AvailableRiskPoints.One,
        riskProfile,
      );

      await this.logger.info(`${AvailableRiskPoints.One} risk points were add from ${SuitabilityRiskProfileNames.Home} and ${SuitabilityRiskProfileNames.Disability} insurance because user house is mortgaged.`);
    }

    const data = {
      user,
      riskProfile,
      finish,
    };

    this.eventEmitter.emit(Events.CalculatesRiskPointsByDependents, data);
  }
}

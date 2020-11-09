import { NextFunction } from 'express';
import { EventEmitter, LoggerDTO } from '@domain/shared/Contracts';
import { UserDTO } from '@domain/user';
import { AvailableRiskPoints } from '@shared/enums/AvailableRiskPoints';
import { Events } from '@shared/enums/Events';
import { SuitabilityRiskProfileNames } from '@shared/enums/SuitabilityRiskProfileNames';
import { ModifyRiskPoints } from '../Repository';
import RiskProfile from '../RiskProfile';

interface CreateRiskProfileEvent {
  user: UserDTO;
  riskProfile: RiskProfile;
  finish: NextFunction;
}
export default class CalculatesRiskPointsByDependents {
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
    if (user.dependents) {
      await this.addRiskPointForEligibleInsurances.execute(
        SuitabilityRiskProfileNames.Disability,
        AvailableRiskPoints.One,
        riskProfile,
      );

      await this.addRiskPointForEligibleInsurances.execute(
        SuitabilityRiskProfileNames.Life,
        AvailableRiskPoints.One,
        riskProfile,
      );

      await this.logger.info(`${AvailableRiskPoints.One} risk points were add from ${SuitabilityRiskProfileNames.Disability} and ${SuitabilityRiskProfileNames.Life} insurance because the user has dependents.`);
    }

    const data = {
      user,
      riskProfile,
      finish,
    };

    this.eventEmitter.emit(Events.CalculatesRiskPointsByMaritalStatus, data);
  }
}

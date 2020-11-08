import { User, UseCases, Errors as UserErrors } from '@domain/user';
import { LoggerDTO } from '@domain/shared/Contracts';
import RiskProfile, { SuitabilityRiskProfile } from '../RiskProfile';
import {
  CalculateScore,
  DetermineEligibility,
  ProviderOfSuitability,
  CalculateRisk,
} from '../Repository';

import { FailureToProvideSuitability } from '../error';

export default class ProvideRiskProfileForInsurances {
  public riskProfile: RiskProfile;

  constructor(
    private readonly fetcherUser: UseCases.Fetch,
    private readonly calculatesBaseScoreByRiskQuestions: CalculateScore,
    private readonly determineInsuranceEligibility: DetermineEligibility,
    private readonly createSuitabilityOfRiskProfile: ProviderOfSuitability,
    private readonly calculatesRiskPointsByAge: CalculateRisk,
    private readonly calculatesRiskPointsByIncome: CalculateRisk,
    private readonly calculatesRiskPointsByHouse: CalculateRisk,
    private readonly calculatesRiskPointsByDependents: CalculateRisk,
    private readonly calculatesRiskPointsByMaritalStatus: CalculateRisk,
    private readonly calculatesRiskPointsByVehicle: CalculateRisk,
    private readonly logger: LoggerDTO,
  ) { }

  async execute(userId: string): Promise<SuitabilityRiskProfile> {
    try {
      const userData = await this.fetcherUser.execute(userId);
      if (!userData) {
        throw new UserErrors.UserNotFound();
      }

      const user = new User(userData);
      user.prepareToReadFromDatabase();

      const baseScore = await this.calculatesBaseScoreByRiskQuestions.execute(user.risk_questions);

      this.riskProfile = new RiskProfile({
        userId: user.id,
        baseEligibleStatus: true,
        baseScore,
      });

      await this.determineInsuranceEligibility.execute(user, this.riskProfile);

      const userHasEligibleInsurance = await this.checkInsuranceEligibility();

      if (!userHasEligibleInsurance) {
        await this.logger.info('All insurance is not eligible for the user');
        return this.createSuitabilityOfRiskProfile.execute(this.riskProfile);
      }

      await this.calculatesRiskPointsByAge.execute(user, this.riskProfile);
      await this.calculatesRiskPointsByIncome.execute(user, this.riskProfile);
      await this.calculatesRiskPointsByHouse.execute(user, this.riskProfile);
      await this.calculatesRiskPointsByDependents.execute(user, this.riskProfile);
      await this.calculatesRiskPointsByMaritalStatus.execute(user, this.riskProfile);
      await this.calculatesRiskPointsByVehicle.execute(user, this.riskProfile);

      await this.logger.info('Risk points calculated and ready to create the suitability of the risk profile');
      return this.createSuitabilityOfRiskProfile.execute(this.riskProfile);
    } catch (error) {
      if (!error.statusCode) {
        throw new FailureToProvideSuitability();
      }

      throw error;
    }
  }

  public async checkInsuranceEligibility(): Promise<boolean> {
    const insurances = Object.keys(this.riskProfile);

    return !!insurances.find((insurance) => this.riskProfile[insurance].isEligible === true);
  }
}

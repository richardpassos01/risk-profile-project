import RiskProfile from '../RiskProfile';

export default class AddRiskPointForEligibleInsurances {
  public execute(insurance: string, points: number, riskProfile: RiskProfile): Promise<void> {
    if (riskProfile[insurance].isEligible) {
      riskProfile[insurance].riskPoint += points;
    }

    return null;
  }
}

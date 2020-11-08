import { Fetchable } from '../Repository';
import { SuitabilityRiskProfile } from '../RiskProfile';

export default class Fetch {
  constructor(
    private readonly fetcher: Fetchable,
  ) { }

  async execute(
    userId: string,
  ): Promise<SuitabilityRiskProfile[]> {
    return this.fetcher.fetch(userId);
  }
}

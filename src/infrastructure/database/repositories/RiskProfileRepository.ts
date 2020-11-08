import { Creatable, Fetchable } from '@domain/riskProfile/Repository';
import { SuitabilityRiskProfile } from '@domain/riskProfile';
import { infrastructure } from '@shared/config';
import Database from '../Database';

const RiskProfileTable = infrastructure.database.tables.riskProfile;

export default class RiskProfileRepository implements Creatable, Fetchable {
  constructor(
    private readonly database: Database,
  ) { }

  async create(riskProfile: SuitabilityRiskProfile): Promise<void> {
    return this.database.connection().insert(riskProfile)
      .into(RiskProfileTable);
  }

  async fetch(user_id: string): Promise<SuitabilityRiskProfile[]> {
    return this.database.connection()
      .select('*')
      .from(RiskProfileTable)
      .where({
        user_id,
      });
  }
}

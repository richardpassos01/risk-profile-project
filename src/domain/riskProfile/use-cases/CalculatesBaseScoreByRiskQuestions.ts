import { LoggerDTO } from '@domain/shared/Contracts';
import { UserRiskQuestions } from '@domain/user';

export default class CalculatesBaseScoreByRiskQuestions {
  constructor(
    public readonly logger: LoggerDTO,
  ) { }

  async execute(riskQuestions: UserRiskQuestions): Promise<number> {
    const reducer = (
      accumulator: any,
      currentValue: any,
    ) => accumulator + currentValue;

    const baseScore = riskQuestions.reduce(reducer);

    await this.logger.info(`The basic score by the sum of the answers to the risk questions ${baseScore}`);
    return baseScore;
  }
}

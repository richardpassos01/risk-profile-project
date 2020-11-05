import { UserRiskQuestions } from '@domain/user';
import CalculatesBaseScoreByRiskQuestions from '@domain/riskProfile/use-cases/CalculatesBaseScoreByRiskQuestions';
import {
  mockLogger,
} from '@test/mock';

describe('CalculatesBaseScoreByRiskQuestions', () => {
  let calculatesBaseScoreByRiskQuestions: CalculatesBaseScoreByRiskQuestions;
  let riskQuestions: UserRiskQuestions;

  beforeAll(() => {
    riskQuestions = [0, 1, 0];
    calculatesBaseScoreByRiskQuestions = new CalculatesBaseScoreByRiskQuestions(
      mockLogger,
    );
  });

  test('Should return the sum about all numbers inside risk question array', async () => {
    const baseScore = await calculatesBaseScoreByRiskQuestions.execute(riskQuestions);

    expect(baseScore).toBe(1);
  });
});

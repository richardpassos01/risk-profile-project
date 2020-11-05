import {
  CalculateRisk,
  CalculateScore,
  ProviderOfSuitability,
} from '@domain/riskProfile/Repository';
import { LoggerDTO } from '@domain/shared/Contracts';

export const mockLogger: LoggerDTO = {
  info: jest.fn().mockReturnValue(true),
  error: jest.fn().mockReturnValue(true),
};

export const mockUseCaseDefault = {
  execute: jest.fn().mockResolvedValue(Promise),
};

export const mockUseCaseDefaultError = {
  execute: jest.fn().mockRejectedValue('BAD SITUATION!'),
};

export const mockCalculatesBaseScoreByRiskQuestions: CalculateScore = {
  execute: jest.fn().mockReturnValue(1),
};

export const mockDefaultCalculateRisk: CalculateRisk = {
  execute: jest.fn().mockReturnValue(undefined),
};

export const mockCreateSuitabilityBasedOnRiskProfile: ProviderOfSuitability = {
  execute: jest.fn().mockReturnValue({
    auto: 'regular',
    disability: 'ineligible',
    home: 'economic',
    life: 'regular',
  }),
};

export const userMock = {
  age: 35,
  dependents: 2,
  house: { ownership_status: 'owned' },
  income: 0,
  marital_status: 'married',
  risk_questions: [0, 1, 0],
  vehicle: { year: 2018 },
};

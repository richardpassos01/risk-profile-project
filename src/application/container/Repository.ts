import { Database, Repositories } from '@infrastructure/database';
import { Repository as UserRepository } from '@domain/user';
import { Repository as RiskProfileRepository } from '@domain/riskProfile';

const database = Database.getInstance();

const userRepository = new Repositories.UserRepository(database);
const riskProfileRepository = new Repositories.RiskProfileRepository(database);

export function userFetcher(): UserRepository.Fetchable {
  return userRepository;
}

export function userCreator(): UserRepository.Creatable {
  return userRepository;
}

export function riskProfileCreator(): RiskProfileRepository.Creatable {
  return riskProfileRepository;
}

export function riskProfileFetcher(): RiskProfileRepository.Fetchable {
  return riskProfileRepository;
}

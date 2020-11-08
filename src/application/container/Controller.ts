import RiskProfileController from '../controller/RiskProfileController';
import UserController from '../controller/UserController';
import {
  fetcherRiskProfile,
  provideRiskProfileForInsurances,
  createUser,
} from './UseCases';

function riskProfileController(): RiskProfileController {
  return new RiskProfileController(
    provideRiskProfileForInsurances,
    fetcherRiskProfile,
  );
}

function userController(): UserController {
  return new UserController(
    createUser,
  );
}

export default {
  riskProfile: riskProfileController(),
  user: userController(),
};

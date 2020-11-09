import RiskProfileController from '../controller/RiskProfileController';
import UserController from '../controller/UserController';
import {
  fetcherRiskProfile,
  fetcherUser,
  createUser,
} from './UseCases';

function riskProfileController(): RiskProfileController {
  return new RiskProfileController(
    fetcherUser,
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

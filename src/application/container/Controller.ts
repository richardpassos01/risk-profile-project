import RiskProfileController from '../controller/RiskProfileController';
import { provideRiskProfileForInsurances } from './UseCases';

function riskProfileController(): RiskProfileController {
  return new RiskProfileController(
    provideRiskProfileForInsurances,
  );
}

export default {
  riskProfile: riskProfileController(),
};

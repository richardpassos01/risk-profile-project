import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status-codes';
import UseCase from '@domain/riskProfile/use-cases/ProvideRiskProfileForInsurances';

export default class RiskProfileController {
  constructor(
    private useCase: UseCase,
  ) { }

  async handle(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    try {
      const {
        age,
        dependents,
        house,
        income,
        marital_status,
        risk_questions,
        vehicle,
      } = request.body;

      const riskProfileForInsurances = await this.useCase.execute({
        age,
        dependents,
        house,
        income,
        marital_status,
        risk_questions,
        vehicle,
      });

      return response.status(httpStatus.OK).send(riskProfileForInsurances);
    } catch (error) {
      return next(error);
    }
  }
}

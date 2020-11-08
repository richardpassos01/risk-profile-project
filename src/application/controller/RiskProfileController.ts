import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status-codes';
import { UseCases } from '@domain/riskProfile';

export default class RiskProfileController {
  constructor(
    private provideSuitability: UseCases.ProvideRiskProfileForInsurances,
    private getSuitability: UseCases.Fetch,
  ) { }

  async post(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    try {
      const {
        userId,
      } = request.body;

      const riskProfileForInsurances = await this.provideSuitability.execute(userId);

      return response.status(httpStatus.OK).send(riskProfileForInsurances);
    } catch (error) {
      return next(error);
    }
  }

  async get(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    try {
      const {
        userId,
      } = request.params;

      const riskProfiles = await this.getSuitability.execute(userId);

      return response.status(httpStatus.OK).send(riskProfiles);
    } catch (error) {
      return next(error);
    }
  }
}

import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status-codes';
import { UseCases } from '@domain/riskProfile';
import { UseCases as UserUseCases } from '@domain/user';

export default class RiskProfileController {
  constructor(
    private fetcherUser: UserUseCases.Fetch,
    private getSuitability: UseCases.Fetch,
  ) { }

  async post(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const {
        userId,
      } = request.body;

      const success = (riskProfileForInsurances) => response.status(httpStatus.OK)
        .send(riskProfileForInsurances);

      return this.fetcherUser.execute(userId, success);
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

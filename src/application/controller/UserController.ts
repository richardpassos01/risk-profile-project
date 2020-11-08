import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status-codes';
import UseCase from '@domain/user/use-cases/Create';

export default class UserController {
  constructor(
    private useCase: UseCase,
  ) { }

  async post(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
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

      const user = await this.useCase.execute({
        age,
        dependents,
        house,
        income,
        marital_status,
        risk_questions,
        vehicle,
      });

      return response.status(httpStatus.OK).send(user);
    } catch (error) {
      return next(error);
    }
  }
}

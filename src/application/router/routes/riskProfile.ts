import Container from '@application/container';
import { Schemas } from '@domain/user';
import { Router } from 'express';

import { schemaValidator } from '../../middlewares/schemaValidator';

export default function riskProfileRoutes(router: Router): void {
  router.post('/risk-profile', schemaValidator.body(Schemas.userId),
    (Request, Response, next) => Container.controller.riskProfile.post(Request, Response, next));

  router.get('/risk-profile/:userId', schemaValidator.params(Schemas.userId),
    (Request, Response, next) => Container.controller.riskProfile.get(Request, Response, next));
}

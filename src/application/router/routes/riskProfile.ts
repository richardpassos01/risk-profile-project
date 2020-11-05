import Container from '@application/container';
import { Schemas } from '@domain/user';
import { Router } from 'express';

import { schemaValidator } from '../../middlewares/schemaValidator';

export default function riskProfileRoutes(router: Router): void {
  router.post('/risk-profile', schemaValidator.body(Schemas.entranceCriteria),
    (Request, Response, next) => Container.controller.riskProfile.handle(Request, Response, next));
}

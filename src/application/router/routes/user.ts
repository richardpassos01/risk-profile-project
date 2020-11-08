import Container from '@application/container';
import { Schemas } from '@domain/user';
import { Router } from 'express';

import { schemaValidator } from '../../middlewares/schemaValidator';

export default function userRoutes(router: Router): void {
  router.post('/user', schemaValidator.body(Schemas.entranceCriteria),
    (Request, Response, next) => Container.controller.user.post(Request, Response, next));
}

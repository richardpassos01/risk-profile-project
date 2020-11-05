import { createValidator } from 'express-joi-validation';

export const schemaValidator = createValidator({
  passError: true,
});

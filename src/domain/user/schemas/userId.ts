import Joi from 'joi';

const userId = Joi.object({
  userId: Joi.string(),
});

export default userId;

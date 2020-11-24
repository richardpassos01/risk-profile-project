import Joi from 'joi';

const entranceCriteria = Joi.object({
  age: Joi.number().integer().min(0)
    .required(),
  dependents: Joi.number().integer().min(0).required(),
  house: Joi.object({
    ownership_status: Joi.string().valid('owned').valid('mortgaged'),
  }).optional(),
  income: Joi.number().integer().min(0).required(),
  marital_status: Joi.string()
    .valid('single')
    .valid('married')
    .valid('divorced')
    .valid('domestic_partnership')
    .required(),
  risk_questions: Joi.array().ordered(
    Joi.number().min(0).max(1).required(),
    Joi.number().min(0).max(1).required(),
    Joi.number().min(0).max(1).required(),
  ).required(),
  vehicle: Joi.object({
    year: Joi.number().integer().positive(),
  }).optional(),
});

export default entranceCriteria;

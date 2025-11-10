import Joi from 'joi';

export const environmentValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.number().integer().min(0).default(3000),
  DATABASE_HOST: Joi.string().required(),
  DATABASE_PORT: Joi.number().integer().min(0).default(5432),
  DATABASE_NAME: Joi.string().required(),
  DATABASE_USER: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
  DATABASE_SCHEMA: Joi.string().default('public'),
  DATABASE_SSL: Joi.string().valid('true', 'false').default('false'),
  DATABASE_SSL_REJECT_UNAUTHORIZED: Joi.string()
    .valid('true', 'false')
    .default('true'),
  TYPEORM_SYNCHRONIZE: Joi.string().valid('true', 'false').default('false'),
  TYPEORM_LOGGING: Joi.string().valid('true', 'false').default('false'),
});

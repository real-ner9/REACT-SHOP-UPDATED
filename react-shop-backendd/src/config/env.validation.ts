import Joi from 'joi';

export const environmentValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.number().integer().min(0).default(3000),
  
  // Database configuration
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
  
  // JWT configuration
  JWT_KEY: Joi.string().required(),
  JWT_EXPIRES: Joi.string().default('24h'),
  
  // Email configuration (optional)
  EMAIL_SERVICE: Joi.string().optional(),
  EMAIL_HOST: Joi.string().optional(),
  EMAIL_PORT: Joi.number().integer().min(0).optional(),
  EMAIL_USER: Joi.string().optional(),
  EMAIL_PASSWORD: Joi.string().optional(),
  EMAIL_FROM: Joi.string().email().optional(),
  
  // Payment configuration (optional)
  YOOKASSA_SHOP_ID: Joi.string().optional(),
  YOOKASSA_SECRET_KEY: Joi.string().optional(),
  
  // Frontend URL for CORS
  FRONTEND_URL: Joi.string().uri().default('http://localhost:2001'),
});

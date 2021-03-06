const dotenv = require("dotenv");
const path = require("path");
const Joi = require("joi");

dotenv.config({ path: path.join(__dirname, "../.env") });

const envVarSchema = Joi.object({
  NODE_ENV: Joi.string().valid("production", "development", "test").required(),
  PORT: Joi.number().default(5000),
  MONGODB_URL: Joi.string().required().description("Mongo DB url"),
  JWT_SECRET: Joi.string().required().description("JWT secret key"),
  JWT_ACCESS_EXPIRATION_HOURS: Joi.string()
    .default("1h")
    .description("minutes after which access tokens expire"),
  REDIS_HOST: Joi.string().required().description("redis host"),
  REDIS_PASSWORD: Joi.string().required().description("redis passowrd"),
  REDIS_PORT: Joi.number().required().description("redis post"),
}).unknown();

const { value: envVars, error } = envVarSchema.validate(process.env);
console.log(process.env.NODE_ENV);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongoose: {
    url: envVars.MONGODB_URL,
    options: {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationHours: envVars.JWT_ACCESS_EXPIRATION_HOURS,
  },
  redis: {
    host: envVars.REDIS_HOST,
    port: envVars.REDIS_PORT,
    password: envVars.REDIS_PASSWORD,
  },
};

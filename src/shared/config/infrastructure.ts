import env from 'env-var';

const required = process.env.NODE_ENV !== 'test';

const infrastructure = Object.freeze({
  database: {
    connection: {
      host: env.get('DATABASE_HOST').required(required).asString(),
      user: env.get('DATABASE_USER').required(required).asString(),
      password: env.get('DATABASE_PASSWORD').required(required).asString(),
      database: env.get('DATABASE_NAME').required(required).asString(),
    },
    tables: {
      user: 'user',
      riskProfile: 'risk_profile',
    },
  },
});

export default infrastructure;

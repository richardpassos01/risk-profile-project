import env from 'env-var';

import { name, version, description } from '../../../package.json';

const required = process.env.NODE_ENV !== 'test';

const application = Object.freeze({
  name,
  version,
  description,
  port: env.get('PORT').required(required).asIntPositive(),
  logs: {
    name: 'INSURANCE-SUITABILITY-',
    level: env.get('LOG_LEVEL').required(required).asString(),
  },
  errorAcronym: 'RPJ',
});

export default application;

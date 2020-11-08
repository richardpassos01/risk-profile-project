import { application } from '@shared/config';

const errorCodes = Object.freeze({
  generic: {
    INTERNAL_SERVER_ERROR: `${application.errorAcronym}GNC0001`,
    BAD_REQUEST: `${application.errorAcronym}GNC0003`,
  },
  riskProfile: {
    INTERNAL_SERVER_ERROR: `${application.errorAcronym}RISK0001`,
  },
  user: {
    NOT_FOUND: `${application.errorAcronym}USR0001`,
  },
});

export default errorCodes;

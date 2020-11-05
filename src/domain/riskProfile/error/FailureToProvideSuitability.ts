import httpStatus from 'http-status-codes';
import CustomError from '@domain/shared/error/CustomError';
import errorCodes from '@application/error/codes';

export default class FailureToProvideSuitability extends CustomError {
  constructor() {
    super({
      code: errorCodes.riskProfile.INTERNAL_SERVER_ERROR,
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: 'Unexpected error when providing user suitability',
    });
  }
}

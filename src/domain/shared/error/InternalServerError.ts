import httpStatus from 'http-status-codes';
import codes from '@application/error/codes';
import CustomError from './CustomError';

export default class InternalServerError extends CustomError {
  public constructor() {
    super({
      message: 'Internal Server Error',
      code: codes.generic.INTERNAL_SERVER_ERROR,
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
    });
  }
}

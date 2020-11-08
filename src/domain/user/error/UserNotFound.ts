import httpStatus from 'http-status-codes';
import CustomError from '@domain/shared/error/CustomError';
import errorCodes from '@application/error/codes';

export default class UserNotFound extends CustomError {
  constructor() {
    super({
      code: errorCodes.user.NOT_FOUND,
      statusCode: httpStatus.NOT_FOUND,
      message: 'The user was not found',
    });
  }
}

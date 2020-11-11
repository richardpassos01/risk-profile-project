import httpStatus from 'http-status-codes';
import CustomError from '@domain/shared/error/CustomError';
import errorCodes from '@application/error/codes';

export default class MissingEvent extends CustomError {
  constructor() {
    super({
      code: errorCodes.events.MISSING,
      statusCode: httpStatus.UNPROCESSABLE_ENTITY,
      message: 'You have called an invalid event, check that this event remains active.',
    });
  }
}

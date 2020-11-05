/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status-codes';
import CustomError, { CustomErrorModel } from '@domain/shared/error/CustomError';
import InternalServerError from '@domain/shared/error//InternalServerError';
import codes from './codes';

const handler = (
  error: CustomErrorModel,
  request: Request,
  response: Response,
  _next: NextFunction,
): Response => {
  if (error.statusCode) {
    return response.status(error.statusCode).json({
      code: error.code,
      message: error.message,
      field: error.field,
    });
  }

  if (error && error.error && error.error.isJoi) {
    const customError = new CustomError({
      message: error.error.toString(),
      code: codes.generic.BAD_REQUEST,
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      field: error.type,
    });

    return response.status(customError.statusCode).json({
      code: customError.code,
      message: customError.message,
      field: customError.field,
    });
  }

  const customError = new InternalServerError();

  return response.status(customError.statusCode).json({
    code: customError.code,
    message: customError.message,
    field: customError.field,
  });
};

export default handler;

import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'

import { ZodError } from 'zod'
import config from '../../config'
import { IGenericErrorMessage } from '../../interfaces/error'
import handleValidationError from '../../errors/handleValidationError'
import handleCastError from '../../errors/handleCastError'
import { handleZodError } from '../../errors/handleZodError'
import ApiError from '../../errors/ApiError'

const globalErrorHandler: ErrorRequestHandler = (
  error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  config.env === 'development'
    ? console.log('globalErrorHandler', error)
    : console.log('globalErrorHandler', error)

  let statusCode = 400
  let message = 'Something went wrong'
  let errorMessages: IGenericErrorMessage[] = []

  if (error?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages
  } else if (error?.name === 'CastError') {
    // res.status(200).json({ error });
    const simplifiedError = handleCastError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages
  } else if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages
  } else if (error instanceof ApiError) {
    statusCode = error.statusCode
    message = error?.message
    errorMessages = error?.message
      ? [{ path: '', message: error?.message }]
      : []
  } else if (error instanceof Error) {
    message = error?.message
    errorMessages = error?.message
      ? [{ path: '', message: error?.message }]
      : []
  }
  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    // eslint-disable-next-line no-undefined
    stack: config.env !== 'production' ? error.stack : undefined,
  })
}

export default globalErrorHandler

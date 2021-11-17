import { NextFunction, Request, Response } from 'express'

import AppError from './AppError'

function globalExceptionHandler(
  error: Error,
  req: Request,
  res: Response,
  _: NextFunction,
): Response | void {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    })
  }
  // eslint-disable-next-line no-console
  console.log(error)
  return res
    .status(500)
    .json({ status: 'error', message: 'Internal server error' })
}

export default globalExceptionHandler

import type { Request, Response, NextFunction } from 'express'
import { ZodError } from 'zod'
import type { AppError } from '../types'
import { Sentry } from '../config/sentry'

export function errorMiddleware(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  if (err instanceof ZodError) {
    res.status(400).json({
      message: 'Validation error',
      errors: err.errors.map((e) => ({
        field: e.path.join('.'),
        message: e.message,
      })),
    })
    return
  }

  const status = (err as AppError).statusCode ?? 500
  if (status >= 500) Sentry.captureException(err)
  const message = status < 500 ? err.message : 'Internal server error'
  res.status(status).json({ message })
}

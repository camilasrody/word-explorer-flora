import type { Response } from 'express'

export function sendSuccess<T>(res: Response, data: T, status = 200): void {
  res.status(status).json(data)
}

export function sendError(res: Response, message: string, status = 400): void {
  res.status(status).json({ message })
}

export function sendNoContent(res: Response): void {
  res.status(204).send()
}

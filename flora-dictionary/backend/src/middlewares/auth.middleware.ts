import type { Request, Response, NextFunction } from 'express'
import { verifyToken } from '../utils/jwt.util'
import { sendError } from '../utils/response.util'

export function authenticate(req: Request, res: Response, next: NextFunction): void {
  const cookieToken = req.cookies?.access_token as string | undefined
  const bearerToken = extractBearer(req)
  const token = cookieToken ?? bearerToken

  if (!token) {
    sendError(res, 'Unauthorized', 401)
    return
  }

  try {
    req.user = verifyToken(token)
    next()
  } catch {
    sendError(res, 'Unauthorized', 401)
  }
}

function extractBearer(req: Request): string | null {
  const auth = req.headers.authorization
  if (typeof auth === 'string' && auth.startsWith('Bearer ')) {
    return auth.slice(7)
  }
  return null
}

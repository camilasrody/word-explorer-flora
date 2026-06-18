import type { Request, Response, NextFunction } from 'express'
import { signup, signin } from '../services/auth.service'
import { sendSuccess, sendNoContent } from '../utils/response.util'
import { env } from '../config/env'

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: env.NODE_ENV === 'production',
  sameSite: 'strict' as const,
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: '/',
}

export async function handleSignup(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { user, token } = await signup(req.body)
    res.cookie('access_token', token, COOKIE_OPTIONS)
    sendSuccess(res, { id: user.id, name: user.name, token: `Bearer ${token}` }, 201)
  } catch (err) {
    next(err)
  }
}

export async function handleSignin(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { user, token } = await signin(req.body)
    res.cookie('access_token', token, COOKIE_OPTIONS)
    sendSuccess(res, { id: user.id, name: user.name, token: `Bearer ${token}` })
  } catch (err) {
    next(err)
  }
}

export function handleSignout(_req: Request, res: Response): void {
  res.clearCookie('access_token', { path: '/' })
  sendNoContent(res)
}

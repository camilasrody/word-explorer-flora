import type { Request, Response, NextFunction } from 'express'
import { redis } from '../config/redis'

export function cacheMiddleware(ttlSeconds: number) {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const key = `cache:${req.originalUrl}`
    const start = Date.now()

    const cached = await redis.get(key).catch(() => null)

    if (cached) {
      res.set('x-cache', 'HIT')
      res.set('x-response-time', `${Date.now() - start}ms`)
      res.set('content-type', 'application/json; charset=utf-8')
      res.send(cached)
      return
    }

    const originalJson = res.json.bind(res)
    res.json = (body: unknown) => {
      res.set('x-cache', 'MISS')
      res.set('x-response-time', `${Date.now() - start}ms`)
      redis.setex(key, ttlSeconds, JSON.stringify(body)).catch(() => null)
      return originalJson(body)
    }

    next()
  }
}

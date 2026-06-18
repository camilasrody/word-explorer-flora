import Redis from 'ioredis'
import { env } from './env'

export const redis = new Redis(env.REDIS_URL, {
  maxRetriesPerRequest: 3,
  retryStrategy: (times) => Math.min(times * 50, 2000),
  enableOfflineQueue: false,
  lazyConnect: true,
})

redis.on('error', (err) => {
  if (env.NODE_ENV !== 'test') {
    console.error('[Redis]', err.message)
  }
})

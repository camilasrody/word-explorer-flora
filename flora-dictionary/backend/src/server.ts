import 'dotenv/config'
import './config/sentry'
import app from './app'
import { env } from './config/env'
import { prisma } from './config/database'
import { redis } from './config/redis'

async function bootstrap() {
  await prisma.$connect()
  await redis.connect()

  const server = app.listen(env.PORT, () => {
    console.log(`[server] listening on port ${env.PORT} (${env.NODE_ENV})`)
  })

  async function shutdown() {
    server.close()
    await prisma.$disconnect()
    redis.disconnect()
    process.exit(0)
  }

  process.on('SIGTERM', shutdown)
  process.on('SIGINT', shutdown)
}

bootstrap().catch((err) => {
  console.error('[bootstrap]', err)
  process.exit(1)
})

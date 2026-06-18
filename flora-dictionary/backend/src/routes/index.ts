import { Router } from 'express'
import authRoutes from './auth.routes'
import entriesRoutes from './entries.routes'
import userRoutes from './user.routes'

const router = Router()

router.use('/auth', authRoutes)
router.use('/entries', entriesRoutes)
router.use('/user', userRoutes)

router.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

export default router

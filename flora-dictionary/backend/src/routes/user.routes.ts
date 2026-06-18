import { Router } from 'express'
import {
  handleGetProfile,
  handleGetHistory,
  handleClearHistory,
  handleGetFavorites,
  handleAddFavorite,
  handleRemoveFavorite,
} from '../controllers/user.controller'
import { authenticate } from '../middlewares/auth.middleware'

const router = Router()

router.use(authenticate)

router.get('/me', handleGetProfile)
router.get('/me/history', handleGetHistory)
router.delete('/me/history', handleClearHistory)
router.get('/me/favorites', handleGetFavorites)
router.post('/me/favorites/:word', handleAddFavorite)
router.delete('/me/favorites/:word', handleRemoveFavorite)

export default router

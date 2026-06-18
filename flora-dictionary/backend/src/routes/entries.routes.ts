import { Router } from 'express'
import { handleListWords, handleGetWord } from '../controllers/words.controller'
import { handleAddFavorite, handleRemoveFavorite } from '../controllers/user.controller'
import { authenticate } from '../middlewares/auth.middleware'
import { cacheMiddleware } from '../middlewares/cache.middleware'

const router = Router()

router.get('/en', cacheMiddleware(300), handleListWords)
router.get('/en/:word', authenticate, handleGetWord)
router.post('/en/:word/favorite', authenticate, handleAddFavorite)
router.delete('/en/:word/unfavorite', authenticate, handleRemoveFavorite)

export default router

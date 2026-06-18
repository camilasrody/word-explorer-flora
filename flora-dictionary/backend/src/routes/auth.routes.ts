import { Router } from 'express'
import { handleSignup, handleSignin, handleSignout } from '../controllers/auth.controller'
import { validate } from '../middlewares/validate.middleware'
import { signupSchema, signinSchema } from '../schemas/auth.schema'

const router = Router()

router.post('/signup', validate(signupSchema), handleSignup)
router.post('/signin', validate(signinSchema), handleSignin)
router.post('/signout', handleSignout)

export default router

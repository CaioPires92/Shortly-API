import { router } from 'express'
import validateSchema from '../middlewares/validateSchema.middleware.js'
import { createUser, login } from '../controllers/auth.controellers.js'

const authRouter = Router()

authRouter.post('/signup', createUser)
authRouter.post('/signin', login)

export default authRouter

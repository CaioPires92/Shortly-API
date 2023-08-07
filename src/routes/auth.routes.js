import { Router } from 'express'
import { signUp, login } from '../controllers/auth.controllers.js'
import { userSchema } from '../schemas/user.schema.js'
import { loginSchema } from '../schemas/login.schema.js'
import validateSchema from '../middlewares/validateSchema.middleware.js'

const authRouter = Router()

authRouter.post('/signup', validateSchema(userSchema), signUp)
authRouter.post('/signin', validateSchema(loginSchema), login)

export default authRouter

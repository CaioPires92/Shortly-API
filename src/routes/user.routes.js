import { Router } from 'express'

import { authValidation } from '../middlewares/authValidation.js'
import {
  currentUserDetails,
  getRanking
} from '../controllers/users.controllers.js'

const userRouter = Router()

userRouter.get('/users/me', authValidation, currentUserDetails)
userRouter.get('/ranking', getRanking)

export default userRouter

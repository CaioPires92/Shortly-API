import { Router } from 'express'
// import validateSchema from '../middlewares/validateSchema.middleware.js'
import { createShorten } from '../controllers/url.controllers.js'
import { authValidation } from '../middlewares/authValidation.js'
import validateSchema from '../middlewares/validateSchema.middleware.js'
import { urlValidationSchema } from '../schemas/url.schema.js'

const urlRouter = Router()

urlRouter.post('/urls/shorten', authValidation, validateSchema(urlValidationSchema), createShorten)
// urlRouter.get('/urls/:id', signUp)
// urlRouter.get('/urls/open/:shortUrl', signUp)
// urlRouter.get('/users/me', signUp)
// urlRouter.post('/ranking', signUp)

export default urlRouter

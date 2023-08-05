import Joi from 'joi'

export const urlValidationSchema = Joi.object({
  url: Joi.string().uri().required()
})

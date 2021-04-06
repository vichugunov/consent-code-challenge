import * as Joi from 'joi'

export const createUserSchema = Joi.object({
  email: Joi.string().email()
})
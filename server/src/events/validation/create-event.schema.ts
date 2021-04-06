import * as Joi from 'joi'

const UserIdentifierSchema = Joi.object({
  id: Joi.string().guid()
})

const ConsentSchema = Joi.object({
  id: Joi.string().valid('email_notifications', 'sms_notifications'),
  enabled: Joi.boolean()
})

export const createEventSchema = Joi.object({
  user: UserIdentifierSchema,
  consents: Joi.array().items(ConsentSchema)
})
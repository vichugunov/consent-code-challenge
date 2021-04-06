import * as Joi from 'joi'

const UserIdentifierSchema = Joi.object({
  id: Joi.string().guid().required()
})

const ConsentSchema = Joi.object({
  id: Joi.string().valid('email_notifications', 'sms_notifications').required(),
  enabled: Joi.boolean().required()
})

export const createEventSchema = Joi.object({
  user: UserIdentifierSchema,
  consents: Joi.array().items(ConsentSchema)
})
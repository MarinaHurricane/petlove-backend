import { Joi, Segments } from "celebrate";

export const updateUserSchema = {
  [Segments.BODY] : Joi.object({
    name: Joi.string().trim().min(2),
    email: Joi.string().email().trim(),
    phone: Joi.string()
  .pattern(/^\+?[0-9\s\-()]{7,20}$/)
  .messages({
    'string.pattern.base': 'Invalid phone number format',
  })
  .optional()
  .allow('')
  })
};

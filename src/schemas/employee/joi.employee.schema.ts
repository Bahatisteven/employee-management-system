import joi from "joi";

export const createEmployeeSchema = joi.object({
  name: joi.string().required().messages({
    "any.required": `"name" is required field`,
  }),
  email: joi.string().email().required().messages({
    "any.required": `"email" is required field`,
  }),
  phone: joi.number().integer().required().messages({
    "any.required": `"phone" is required field`,
  }),
  residence: joi.string().required().messages({
    "any.required": `"residence" is required field`,
  }),
});

export const idEmployeeSchema = joi.object({
  id: joi.string().required(),
});

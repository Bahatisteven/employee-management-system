import Joi from "joi";

interface employeeSchemaI {
    username: string;
    email: string;
    phone_number: number;
    residence: string;
}

export const employeeValidator = Joi.object<employeeSchemaI>({
    username: Joi.string()
    .min(3)
    .max(50)
    .required(),

    email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),

    phone_number: Joi.number()
    .integer()
    .required()
    .max(12),

    residence: Joi.string()
    .required()
});
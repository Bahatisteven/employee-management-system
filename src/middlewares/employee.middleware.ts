import { employeeValidator } from "@/validators";
import { NextFunction } from "express";
import Joi, { ObjectSchema } from "joi";

export enum type{
    body = "body",
    query = "query",
    params = "param"
}

interface JoiRequestType<T> {
    schema: ObjectSchema<T>;
    type: Type;
}

export const validateMiddleware = <T>({ schema, type }: JoiRequestType<T>) => {
    return (req: Request , res: Response, next: NextFunction) => {
        const data = req[type];
        const validate = schema.validate(data);
        if (validate.error) {
            
        }
    }
}


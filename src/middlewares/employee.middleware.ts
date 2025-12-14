import { employeeValidator } from "@/validators";
import { Request, Response, NextFunction } from "express";
import Joi, { ObjectSchema } from "joi";
import { ResponseHandler } from "@/utils";

export enum ValidationType{
    BODY = "body",
    QUERY = "query",
    PARAMS = "param"
}

interface ValidationMiddlewareOptions<T> {
    schema: ObjectSchema<T>;
    type: ValidationType;
}

const getValidationData = (req: Request, location: ValidationType): any => {
    switch (location) {
        case ValidationType.BODY:
            return req.body;
            case ValidationType.QUERY:
                return req.query;
                case ValidationType.PARAMS:
                    return req.params;
                    default: 
                    return {};
    }
};



export const validateMiddleware = <T>({ schema, type }: ValidationMiddlewareOptions<T>) => {
    return (req: Request , res: Response, next: NextFunction) => {

        const data = getValidationData(req, type);

        const { error, value } = schema.validate(data, { abortEarly: false, stripUnknown:true });

        if(error) {
            return ResponseHandler.error(res, {
                message: "Validation failed",
                statusCode: 400,
                error: error.details.map(detail => ({
                    field: detail.path.join('.'),
                    message: detail.message
                }))
            });
        }

        //req[type as keyof Request] = value;
        return next();
    };
}


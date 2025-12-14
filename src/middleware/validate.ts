import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
import { ResponseService } from "../utils";

const responseService = new ResponseService();

export type sourceType = "body" | "params" | "query";

export const validateMiddleware =
  (schema: ObjectSchema, type: sourceType = "body") =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req[type];
      const { error, value } = schema.validate(data, { abortEarly: false });

      if (error) {
        return responseService.response({
          res,
          statusCode: 400,
          success: false,
          message: "Invalid Input",
          error: error.details.map((detail) => detail.message),
        });
      }

      // req[type] = value;
      next();
    } catch (error) {
      responseService.serverError({
        res,
        message: "Operation Incomplete",
        error,
      });
    }
  };

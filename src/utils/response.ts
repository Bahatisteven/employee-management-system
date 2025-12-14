import { Response } from "express";

interface ResponseI<T> {
  res: Response;
  success?: boolean;
  statusCode?: number;
  message: string;
  data?: T;
  error?: any;
}

export class ResponseService {
  response = <T>({
    res,
    success = true,
    statusCode = 200,
    message = "Operation Completed",
    data,
    error,
  }: ResponseI<T>): Response => {
    if (statusCode > 200 && statusCode < 299) {
      success = true;
      error = undefined;
    }

    if (statusCode > 400 && statusCode < 599) {
      success = false;
      error = data;
    }
    return res.status(statusCode).json({
      success,
      message,
      data,
      error,
    });
  };

  serverError = <T>({
    res,
    success = false,
    statusCode = 500,
    error,
  }: ResponseI<T>): Response => {
    const { message, stack } = error as Error;
    return res.status(statusCode).json({
      success,
      message,
      data: error,
      error: stack,
    });
  };
}

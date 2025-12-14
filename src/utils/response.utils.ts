import { Response } from "express"

interface ResponseOptions<T>{
    data?: T;
    message?: string;
    statusCode?: number;
}

interface ErrorOptions {
    message?: string;
    statusCode?: number;
    error?: any 
}

export class ResponseHandler {
    private static send<T> (
        res: Response,
        statusCode: number,
        message: string,
        data?: T,
        error?: any
    ) {
        const isSuccess = statusCode >= 200 && statusCode < 300;

        const response: any = {
            success: isSuccess,
            message
        };
        if (isSuccess && data !== undefined) {
            response.data = data;
        }
        if (!isSuccess && error !== undefined) {
            response.error = error?.message || error;
        }
        return res.status(statusCode).json(response)
    }



    static success<T>(res: Response, options: ResponseOptions<T>){
        const { data, message = "Success", statusCode = 200 } = options;
        return this.send(res, statusCode, message, data);
    }

    static error(res: Response, options: ErrorOptions) {
        const { message = "Error occurred", statusCode = 500, error } = options;
        return this.send(res, statusCode, message, undefined, error)
    }

    static created<T>(res: Response, options: ResponseOptions<T>){
        return this.success(res, { ...options, statusCode: 201 });
    }
    static notFound<T>(res: Response, message?: string) {
        return this.error(res, { message: message || "Resource not found", statusCode: 404 })
    }

}
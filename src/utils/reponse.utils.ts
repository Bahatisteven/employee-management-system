import { Response } from "express"

interface ResponseInterface<T>{
    res: Response;
    data?: T;
    message?: string;
    statusCode?: number;
    success?: string;
    error?: string;
}

export class ResponseHandler implements ResponseInterface<any>{
    res: Response;
    data?: any;
    message?: string;
    statusCode?: number;
    success?: string;
    error?: string;
    
}
import {NextFunction,Request, Response} from "express";

import {BadRequestError} from "../exceptions/BadRequestError";
import {ErrorType} from "../exceptions/ErrorType";
import {NotFoundError} from "../exceptions/NotFoundError";
import {UnauthorizedError} from "../exceptions/UnauthorizedError";
import {ValidationError} from "../exceptions/ValidationError";

type ResponseBody = {
    message: string;
    error?: string | any [];
    stack?: string;
};

export const errorHandler = (
    err: Error | ErrorType,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const statusCode = res.statusCode >= 500 ? 500 : res.statusCode;
    res.status(statusCode);

    const responseBody: ResponseBody = {
        message: statusCode >= 500 ? 'Something went wrong' : err.message
    };

    if (process.env.NODE_ENV === 'development') {
        if ("stack" in err) {
            responseBody['stack'] = err.stack;
        }
    }

    if(err !== null) {
        console.log(err);
    }

    switch (err !== null) {
        case err instanceof ValidationError:
            res.status(400);
            const error = err as ValidationError;
            responseBody.message = error.message;
            responseBody.error = error.error;
            break;

        case err instanceof UnauthorizedError:
            res.status(401);
            responseBody.message = err.message;
            break;

        case err instanceof NotFoundError:
            res.status(404);
            responseBody.message = err.message;
            break;

        case err instanceof BadRequestError:
            res.status(422);
            responseBody.message = err.message;
            break;

        default :
            res.status(500);
            responseBody.message = 'Something went wrong';
            break;
    }


    res.json(responseBody);
};
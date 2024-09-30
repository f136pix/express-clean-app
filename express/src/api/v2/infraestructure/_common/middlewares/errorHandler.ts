import {NextFunction, Request, Response} from "express";
import {Validation} from "../exceptions/defaultModels/Validation";
import {ErrorOr} from "../exceptions/ErrorOr";
import {Conflict} from "../exceptions/defaultModels/Conflict";
import {Forbidden} from "../exceptions/defaultModels/Forbidden";
import {NotFound} from "../exceptions/defaultModels/NotFound";
import {Unauthorized} from "../exceptions/defaultModels/Unauthorized";
import {Unexpected} from "../exceptions/defaultModels/Unexpected";

type ResponseBody = {
    message: string;
    error?: string | any [];
    stack?: string;
};

export const errorHandler = (
    err: ErrorOr<undefined> | Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const statusCode = res.statusCode >= 500 ? 500 : res.statusCode;
    res.status(statusCode);

    let responseBody: ResponseBody = {
        message: " "
    };

    if (process.env.NODE_ENV === 'development') {
        if ("stack" in err) {
            responseBody['stack'] = err.stack;
        }
    }

    switch (err !== null) {
        case err instanceof Validation:
            err = err as Validation;
            res.status(422);
            responseBody.error = "Validation Error";
            responseBody.message = err.error!;
            break;
        case err instanceof Conflict:
            err = err as Conflict;
            res.status(409);
            responseBody.error = "Conflict error";
            responseBody.message = err.error!;
            break;
        case err instanceof Forbidden:
            err = err as Forbidden;
            res.status(403);
            responseBody.error = "Forbidden error";
            responseBody.message = err.error!;
            break;
        case err instanceof NotFound:
            err = err as NotFound;
            res.status(404);
            responseBody.error = "Not found error";
            responseBody.message = err.error!;
            break;
        case err instanceof Unauthorized:
            err = err as Unauthorized;
            res.status(401);
            responseBody.error = "Unauthorized error";
            responseBody.message = err.error!;
            break;
        case err instanceof Unexpected:
            err = err as Unexpected;
            res.status(500);
            responseBody.error = "Unexpected error";
            responseBody.message = err.error!;
            break;
        default:
            res.status(500);
            console.log(err);
            responseBody.error = 'Something went wrong';
            responseBody.message = "There was a unexpected error"
            break;
    }
    res.json(responseBody);
};
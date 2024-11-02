"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const BadRequestError_1 = require("../exceptions/BadRequestError");
const NotFoundError_1 = require("../exceptions/NotFoundError");
const UnauthorizedError_1 = require("../exceptions/UnauthorizedError");
const ValidationError_1 = require("../exceptions/ValidationError");
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode >= 500 ? 500 : res.statusCode;
    res.status(statusCode);
    const responseBody = {
        message: statusCode >= 500 ? 'Something went wrong' : err.message
    };
    if (process.env.NODE_ENV === 'development') {
        if ("stack" in err) {
            responseBody['stack'] = err.stack;
        }
    }
    if (err !== null) {
        console.log(err);
    }
    switch (err !== null) {
        case err instanceof ValidationError_1.ValidationError:
            res.status(400);
            const error = err;
            responseBody.message = error.message;
            responseBody.error = error.error;
            break;
        case err instanceof UnauthorizedError_1.UnauthorizedError:
            res.status(401);
            responseBody.message = err.message;
            break;
        case err instanceof NotFoundError_1.NotFoundError:
            res.status(404);
            responseBody.message = err.message;
            break;
        case err instanceof BadRequestError_1.BadRequestError:
            res.status(422);
            responseBody.message = err.message;
            break;
        default:
            res.status(500);
            responseBody.message = 'Something went wrong';
            break;
    }
    res.json(responseBody);
};
exports.errorHandler = errorHandler;

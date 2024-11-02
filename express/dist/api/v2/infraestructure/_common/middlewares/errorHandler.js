"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const Conflict_1 = require("../exceptions/defaultModels/Conflict");
const Forbidden_1 = require("../exceptions/defaultModels/Forbidden");
const NotFound_1 = require("../exceptions/defaultModels/NotFound");
const Unauthorized_1 = require("../exceptions/defaultModels/Unauthorized");
const Unexpected_1 = require("../exceptions/defaultModels/Unexpected");
const Validation_1 = require("../exceptions/defaultModels/Validation");
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode >= 500 ? 500 : res.statusCode;
    res.status(statusCode);
    const responseBody = {
        message: " "
    };
    if (process.env.NODE_ENV === 'development') {
        if ("stack" in err) {
            responseBody['stack'] = err.stack;
        }
    }
    switch (err !== null) {
        case err instanceof Validation_1.Validation:
            err = err;
            res.status(422);
            responseBody.error = "Validation Error";
            responseBody.message = err.error;
            break;
        case err instanceof Conflict_1.Conflict:
            err = err;
            res.status(409);
            responseBody.error = "Conflict error";
            responseBody.message = err.error;
            break;
        case err instanceof Forbidden_1.Forbidden:
            err = err;
            res.status(403);
            responseBody.error = "Forbidden error";
            responseBody.message = err.error;
            break;
        case err instanceof NotFound_1.NotFound:
            err = err;
            res.status(404);
            responseBody.error = "Not found error";
            responseBody.message = err.error;
            break;
        case err instanceof Unauthorized_1.Unauthorized:
            err = err;
            res.status(401);
            responseBody.error = "Unauthorized error";
            responseBody.message = err.error;
            break;
        case err instanceof Unexpected_1.Unexpected:
            err = err;
            res.status(500);
            responseBody.error = "Unexpected error";
            responseBody.message = err.error;
            break;
        default:
            res.status(500);
            console.log(err);
            responseBody.error = 'Something went wrong';
            responseBody.message = "There was a unexpected error";
            break;
    }
    res.json(responseBody);
};
exports.errorHandler = errorHandler;

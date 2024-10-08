import {RequestHandler} from "express";
import Joi, {override} from "joi";

import {ValidationError as ValidationThrowable} from "../exceptions/ValidationError";

interface ValidationError {
    message: string;
    type: string;
}

const supportedMethods = ["post", "put", "patch", "delete"];

const validationOptions = {
    abortEarly: false,
    allowUnknown: false,
    stripUnknown: false,
};

const schemaValidator = (validator: Joi.ObjectSchema): RequestHandler => {
    return (req, res, next) => {
        const method = req.method.toLowerCase();

        if (!supportedMethods.includes(method)) {
            return next();
        }

        const {error, value} = validator.validate(req.body, validationOptions);
        
        if (error) {
            throw new ValidationThrowable("Validation Error", error.details);
        }

        // validation successful
        req.body = value;
        return next();
    };
};

export default schemaValidator;


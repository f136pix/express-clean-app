import {RequestHandler} from "express";
import Joi, {override} from "joi";

import {Validation} from "../exceptions/defaultModels/Validation";

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
            const err = new Validation(error.details[0].message);
            return next(err);
        }

        // validation successful
        req.body = value;
        return next();
    };
};

export default schemaValidator;


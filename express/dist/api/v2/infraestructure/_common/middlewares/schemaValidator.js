"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validation_1 = require("../exceptions/defaultModels/Validation");
const supportedMethods = ["post", "put", "patch", "delete"];
const validationOptions = {
    abortEarly: false,
    allowUnknown: false,
    stripUnknown: false,
};
const schemaValidator = (validator) => {
    return (req, res, next) => {
        const method = req.method.toLowerCase();
        if (!supportedMethods.includes(method)) {
            return next();
        }
        const { error, value } = validator.validate(req.body, validationOptions);
        if (error) {
            const err = new Validation_1.Validation(error.details[0].message);
            return next(err);
        }
        // validation successful
        req.body = value;
        return next();
    };
};
exports.default = schemaValidator;

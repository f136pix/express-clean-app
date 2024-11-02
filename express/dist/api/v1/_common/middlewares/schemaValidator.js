"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ValidationError_1 = require("../exceptions/ValidationError");
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
            throw new ValidationError_1.ValidationError("Validation Error", error.details);
        }
        // validation successful
        req.body = value;
        return next();
    };
};
exports.default = schemaValidator;

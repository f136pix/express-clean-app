import Joi, {ValidationErrorItem} from "joi";

class ValidationError extends Error {
    error;

    constructor(message: string, errors: Joi.ValidationErrorItem[]) {
        super(message);
        this.name = 'ValidationError';
        this.error = errors.map(({message, type}: ValidationErrorItem) => ({
            message: message.replace(/['"]/g, ""),
            type,
        }));
    }
}

export {ValidationError};
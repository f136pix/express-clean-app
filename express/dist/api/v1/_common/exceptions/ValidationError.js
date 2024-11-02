"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = void 0;
class ValidationError extends Error {
    constructor(message, errors) {
        super(message);
        this.name = 'ValidationError';
        this.error = errors.map(({ message, type }) => ({
            message: message.replace(/['"]/g, ""),
            type,
        }));
    }
}
exports.ValidationError = ValidationError;

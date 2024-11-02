"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFound = void 0;
const ErrorOr_1 = require("../ErrorOr");
class NotFound extends ErrorOr_1.ErrorOr {
    constructor(message) {
        super(false, undefined, message ? message : "Resource not found");
    }
    static create() {
        return new NotFound();
    }
}
exports.NotFound = NotFound;

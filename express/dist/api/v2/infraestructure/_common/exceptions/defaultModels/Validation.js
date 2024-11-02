"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validation = void 0;
const ErrorOr_1 = require("../ErrorOr");
class Validation extends ErrorOr_1.ErrorOr {
    constructor(message) {
        super(false, undefined, message ? message : "There was a validation error");
    }
    static create() {
        return new Validation();
    }
}
exports.Validation = Validation;

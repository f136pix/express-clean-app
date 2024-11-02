"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Forbidden = void 0;
const ErrorOr_1 = require("../ErrorOr");
class Forbidden extends ErrorOr_1.ErrorOr {
    constructor(message) {
        super(false, undefined, message ? message : "Resource forbidden");
    }
    static create() {
        return new Forbidden();
    }
}
exports.Forbidden = Forbidden;

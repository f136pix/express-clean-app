"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Unauthorized = void 0;
const ErrorOr_1 = require("../ErrorOr");
class Unauthorized extends ErrorOr_1.ErrorOr {
    constructor(message) {
        super(false, undefined, message ? message : "This resource is unauthorized");
    }
    static create() {
        return new Unauthorized();
    }
}
exports.Unauthorized = Unauthorized;

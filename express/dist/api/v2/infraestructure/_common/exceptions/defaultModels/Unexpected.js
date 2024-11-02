"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Unexpected = void 0;
const ErrorOr_1 = require("../ErrorOr");
class Unexpected extends ErrorOr_1.ErrorOr {
    constructor(message) {
        super(false, undefined, message ? message : "Unexpected error");
    }
    static create() {
        return new Unexpected();
    }
}
exports.Unexpected = Unexpected;

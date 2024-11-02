"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Conflict = void 0;
const ErrorOr_1 = require("../ErrorOr");
class Conflict extends ErrorOr_1.ErrorOr {
    constructor(message) {
        super(false, undefined, message ? message : "There was a conflict error");
    }
    static create() {
        return new Conflict();
    }
}
exports.Conflict = Conflict;

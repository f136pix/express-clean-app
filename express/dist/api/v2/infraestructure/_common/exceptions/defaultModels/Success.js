"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Success = void 0;
const ErrorOr_1 = require("../ErrorOr");
class Success extends ErrorOr_1.ErrorOr {
    constructor(data) {
        super(true, data, undefined);
    }
    static create(data) {
        return new Success(data);
    }
}
exports.Success = Success;

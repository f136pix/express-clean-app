"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorOr = void 0;
class ErrorOr {
    constructor(success, data, error) {
        this.success = success;
        this.data = data;
        this.error = error;
    }
    // static Success<T>(data: T): ErrorOr<T> {
    //     return new ErrorOr<T>(true, data);
    // }
    //
    // static Failure(error: string): ErrorOr<null> {
    //     return new ErrorOr<null>(false, undefined, error);
    // }
    isError() {
        return !this.success;
    }
    getData() {
        return this.data;
    }
    getError() {
        return this.error;
    }
}
exports.ErrorOr = ErrorOr;

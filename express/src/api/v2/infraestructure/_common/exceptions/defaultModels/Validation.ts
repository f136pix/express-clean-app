import {ErrorOr} from "../ErrorOr";

export class Validation extends ErrorOr<undefined> {
    constructor(message?: string) {
        super(false, undefined, message ? message : "There was a validation error");
    }

    static create(): Validation {
        return new Validation();
    }
}
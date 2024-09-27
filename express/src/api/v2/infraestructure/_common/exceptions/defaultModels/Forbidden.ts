import {ErrorOr} from "../ErrorOr";

export class Forbidden extends ErrorOr<undefined> {
    constructor(message?: string) {
        super(false, undefined, message ? message : "Resource forbidden");
    }

    static create(): Forbidden {
        return new Forbidden();
    }
}
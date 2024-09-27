import {ErrorOr} from "../ErrorOr";

export class NotFound extends ErrorOr<undefined> {
    constructor(message?: string) {
        super(false, undefined, message ? message : "Resource not found");
    }

    static create(): NotFound {
        return new NotFound();
    }
}
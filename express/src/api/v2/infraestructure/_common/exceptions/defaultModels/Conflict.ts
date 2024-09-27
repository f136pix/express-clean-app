import {ErrorOr} from "../ErrorOr";

export class Conflict extends ErrorOr<undefined> {
    constructor(message?: string) {
        super(false, undefined, message ? message : "There was a conflict error");
    }

    static create(): Conflict {
        return new Conflict();
    }
}
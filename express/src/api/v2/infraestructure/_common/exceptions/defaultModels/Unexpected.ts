import {ErrorOr} from "../ErrorOr";

export class Unexpected extends ErrorOr<undefined> {
    constructor(message?: string) {
        super(false, undefined, message ? message : "Unexpected error");
    }

    static create(): Unexpected {
        return new Unexpected();
    }
}
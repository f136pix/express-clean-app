import {ErrorOr} from "../ErrorOr";

export class Unauthorized extends ErrorOr<undefined> {
    constructor(message?: string) {
        super(false, undefined, message ? message : "This resource is unauthorized");
    }

    static create(): Unauthorized {
        return new Unauthorized();
    }
}
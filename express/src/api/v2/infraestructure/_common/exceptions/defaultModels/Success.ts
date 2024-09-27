import {ErrorOr} from "../ErrorOr";

export class Success<T> extends ErrorOr<T> {
    constructor(data: T) {
        super(true, data, undefined);
    }

    static create<T>(data: T): Success<T> {
        return new Success<T>(data);
    }
}
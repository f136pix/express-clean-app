export class ErrorOr<T> {
    readonly success: boolean;
    readonly data?: T;
    readonly error?: string;

    protected constructor(success: boolean, data?: T, error?: string) {
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

    isError(): boolean {
        return !this.success;
    }

    getData(): T | undefined {
        return this.data;
    }

    getError(): string | undefined {
        return this.error;
    }
}

export interface IError {

}

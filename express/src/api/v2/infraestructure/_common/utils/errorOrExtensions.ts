import {ErrorOr} from "../exceptions/ErrorOr";

export function handleErrorOr<T>(
    result: ErrorOr<T>,
    onSuccess: (data: T) => void,
    onError: (error: ErrorOr<T>) => void
): void {
    if (result.isError()) {
        onError(result);
    } else {
        onSuccess(result.getData()!);
    }
}
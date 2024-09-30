export interface MessageResponse<T = any> {
    message?: string;
    data?: T;
}
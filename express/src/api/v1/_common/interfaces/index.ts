export interface MessageResponse<T = any> {
    message?: string;
    status: number;
    data?: T;
}
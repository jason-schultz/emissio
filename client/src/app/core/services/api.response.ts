export interface ApiResponse<T> {
    success: boolean;
    data: T;
    error?: string;
    message?: string;
    statusCode?: number;
    timestamp?: string;
}
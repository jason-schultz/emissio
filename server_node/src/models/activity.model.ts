import { ApiResponse } from "./apiResponse.model";

export interface Activity {
    id: number;
    type: string;
    co2e: number;
    timestamp: string;
}
export type ActivityResult = ApiResponse<Activity | null>;
export type ActivityListResult = ApiResponse<Activity[]>;
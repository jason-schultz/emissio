import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/env';
import { ApiResponse } from './api.response';

export interface Activity {
  id: number;
  type: string;
  co2e: number;
  timestamp: string;
}

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private baseUrl = environment.apiBaseUrl + '/activities';
  constructor(private http: HttpClient) { }

  /**
   * Creates a new activity on the server.
   * @param activity The activity to create.
   * @returns An observable of the created activity.
   */
  createActivity(activity: Omit<Activity, 'id' | 'timestamp'>): Observable<Activity> {
    return this.http.post<Activity>(this.baseUrl, activity);
  }

  /**
   * Deletes an activity by its ID from the server.
   * @param id The ID of the activity to delete.
   * @returns An Oberservable that emits no value upon successful deletetion, but completes to signal success or errors out on failure.
   */
  deleteActivity(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  /**
   * Fetches an activity by its ID from the server.
   * @param id The ID of the activity to fetch.
   * @returns An observable of the activity.
   */
  getActivityById(id: number): Observable<Activity> {
    return this.http.get<Activity>(`${this.baseUrl}/${id}`);
  }

  /**
   * Fetches all activities from the server.
   * @returns An observable of the list of activities.
   */
  getAllActivities(): Observable<Activity[]> {
    return this.http.get<ApiResponse<Activity[]>>(this.baseUrl).pipe(
      map((response: { success: boolean; data: Activity[]; }) => {
        if (response.success) {
          return response.data;
        } else {
          throw new Error('Failed to fetch activities');
        }
      })
    );
  }

  /**
   * Updates an existing activity on the server.
   * @param id The ID of the activity to update.
   * @param activity The updated activity data.
   * @returns An observable of the updated activity.
   */
  updateActivity(id: number, activity: Omit<Activity, 'id' | 'timestamp'>): Observable<Activity> {
    return this.http.put<Activity>(`${this.baseUrl}/${id}`, activity);
  }
}

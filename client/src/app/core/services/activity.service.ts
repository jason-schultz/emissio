import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/env';

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

  getAllActivities(): Observable<Activity[]> {
    return this.http.get<Activity[]>(this.baseUrl);
  }

  createActivity(activity: Omit<Activity, 'id' | 'timestamp'>): Observable<Activity> {
    return this.http.post<Activity>(this.baseUrl, activity);
  }
}

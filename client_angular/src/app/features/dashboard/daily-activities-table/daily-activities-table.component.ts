import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Activity, ActivityService } from '../../../core/services/activity.service';

@Component({
  selector: 'app-daily-activities-table',
  imports: [CommonModule],
  templateUrl: './daily-activities-table.component.html',
  styleUrl: './daily-activities-table.component.css'
})
export class DailyActivitiesTableComponent implements OnInit {
  selectedDate: Date = new Date();
  activities: Activity[] = [];
  isLoading: boolean = false;
  error: string | null = null;

  constructor(private activityService: ActivityService) { }

  ngOnInit(): void {
    this.loadActivitiesForDate(this.selectedDate);
  }

  // Placeholder for date picker to select a new date
  onDateChange(newDate: Date): void {
    this.selectedDate = newDate;
    this.loadActivitiesForDate(newDate);
  }

  loadActivitiesForDate(date: Date): void {
    this.isLoading = true;
    this.error = null;
    this.activities = [];

    // Since this is a quick demo app, we will just fetch all activities and filter them by date client side.
    // Ideally, there would be a new service endpoint to fetch activities for a specific date.
    // ie: this.activityService.getActivitiesForDate(date).subscribe(...)
    this.activityService.getAllActivities().subscribe({
      next: (allActivities) => {
        this.activities = allActivities.filter(activity => {
          const activityDate = new Date(activity.timestamp);
          return activityDate.getFullYear() === date.getFullYear() &&
            activityDate.getMonth() === date.getMonth() &&
            activityDate.getDate() === date.getDate();
        });
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading activities:', err);
        this.error = 'Failed to load activities';
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}

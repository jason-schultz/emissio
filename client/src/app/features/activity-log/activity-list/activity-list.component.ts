import { Component } from '@angular/core';
import { Activity, ActivityService } from '../../../core/services/activity.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-activity-list',
  imports: [CommonModule, RouterModule, PageHeaderComponent, ButtonComponent],
  templateUrl: './activity-list.component.html',
  styleUrl: './activity-list.component.css'
})
export class ActivityListComponent {
  activities: Activity[] = [];
  isLoading: boolean = false;
  error: string | null = null;

  constructor(private service: ActivityService, private router: Router) { }

  ngOnInit() {
    this.load();
  }

  load() {
    this.isLoading = true;
    this.error = null;

    this.service.getAllActivities().subscribe({
      next: (data) => {
        console.log('Activities loaded:', data);
        if (data && Array.isArray(data)) {
          this.activities = data;
        }
        else {
          console.error('Unexpected response structure:', data);
          this.activities = [];
          this.error = 'Failed to load activities due to unexpected response format.';
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading activities:', error);
        this.error = 'Failed to load activities. Please try again later.';
        this.activities = [];
        this.isLoading = false;
      },
      complete: () => {
        console.log('Activity loading completed');
        this.isLoading = false;
      }
    });
  }

  onAdd() {
    this.router.navigate(['/activities/new']);
  }

  onEdit(id: number) {
    this.router.navigate([`/activities/${id}/edit`]);
  }

  onDelete(id: number) {
    if (!confirm('Are you sure you want to delete this activity?')) return;
    this.isLoading = true; // Optional: show loading state during delete
    this.service.deleteActivity(id).subscribe({
      next: () => {
        console.log(`Activity ${id} deleted`);
        this.load(); // Reload the list
      },
      error: (err) => {
        console.error(`Error deleting activity ${id}:`, err);
        this.error = `Failed to delete activity.`; // Show an error message
        this.isLoading = false;
      }
    });
  }
}

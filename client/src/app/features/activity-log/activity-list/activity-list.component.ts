import { Component } from '@angular/core';
import { Activity, ActivityService } from '../../../core/services/activity.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../../shared/components/card/card.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-activity-list',
  imports: [CommonModule, RouterModule, PageHeaderComponent, CardComponent, ButtonComponent],
  templateUrl: './activity-list.component.html',
  styleUrl: './activity-list.component.css'
})
export class ActivityListComponent {
  activities: Activity[] = [];

  constructor(private service: ActivityService, private router: Router) { }

  ngOnInit() {
    this.load();
  }

  load() {
    this.service.getAllActivities().subscribe({
      next: (data) => {
        console.log('Activities loaded:', data);
        this.activities = data;
      },
      error: (error) => {
        console.error('Error loading activities:', error);
        this.activities = [];
      },
      complete: () => {
        console.log('Activity loading completed');
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
    this.service.deleteActivity(id).subscribe(() => this.load());
  }
}

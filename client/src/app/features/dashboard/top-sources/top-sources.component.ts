import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../../shared/components/card/card.component';
import { Activity, ActivityService } from '../../../core/services/activity.service';

interface TopSource {
  type: string;
  totalCo2e: number;
}

@Component({
  selector: 'app-top-sources',
  imports: [CardComponent, CommonModule],
  templateUrl: './top-sources.component.html',
  styleUrl: './top-sources.component.css'
})
export class TopSourcesComponent {
  topSources: TopSource[] = [];
  isLoading: boolean = false;
  error: string | null = null;

  constructor(private activityService: ActivityService) { }

  ngOnInit(): void {
    this.loadOverallTopSources();
  }

  loadOverallTopSources(): void {
    this.isLoading = true;
    this.error = null;
    this.topSources = [];
    console.log(`TopSources: Loading overall top sources data`);

    this.activityService.getAllActivities().subscribe({
      next: (activities) => {
        const allActivities = (activities && Array.isArray(activities)) ? activities : [];
        this.topSources = this.processActivitiesForTopSources(allActivities);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('TopSources: Error loading activities:', err);
        this.error = 'Failed to load top sources data.';
        this.isLoading = false;
      }
    });
  }

  processActivitiesForTopSources(activities: Activity[], limit: number = 3): TopSource[] {
    if (!activities || activities.length === 0) {
      return [];
    }
    const co2eByType: { [type: string]: number } = {};
    activities.forEach(activity => {
      if (typeof activity.co2e === 'number') { // Ensure co2e is a number
        co2eByType[activity.type] = (co2eByType[activity.type] || 0) + activity.co2e;
      }
    });

    const sortedSources = Object.entries(co2eByType)
      .map(([type, totalCo2e]) => ({ type, totalCo2e }))
      .sort((a, b) => b.totalCo2e - a.totalCo2e);

    return sortedSources.slice(0, limit);
  }
}

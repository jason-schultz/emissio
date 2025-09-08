import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../../shared/components/card/card.component';
import { ActivityService } from '../../../core/services/activity.service';


interface MonthlySummary {
  totalCo2e: number;
  monthName: string;
  year: number;
}

@Component({
  selector: 'app-emission-summary',
  imports: [CardComponent, CommonModule],
  templateUrl: './emission-summary.component.html',
  styleUrl: './emission-summary.component.css'
})
export class EmissionSummaryComponent {
  summaryData: MonthlySummary | null = null;
  isLoading: boolean = false;
  error: string | null = null;

  constructor(private activityService: ActivityService) { }

  ngOnInit(): void {
    this.loadCurrentMonthData();
  }

  loadCurrentMonthData(): void {
    this.isLoading = true;
    this.error = null;
    this.summaryData = null;

    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const monthName = today.toLocaleDateString(undefined, { month: 'long', year: 'numeric' });

    console.log(`EmissionSummary: Loading data for ${monthName}`);

    this.activityService.getAllActivities().subscribe({
      next: (activities) => {
        const allActivities = (activities && Array.isArray(activities)) ? activities : [];
        const monthlyActivities = allActivities.filter(activity => {
          if (!activity.timestamp) return false;
          const activityDate = new Date(activity.timestamp);
          return activityDate.getFullYear() === currentYear &&
            activityDate.getMonth() === currentMonth;
        });
        const totalCo2e = monthlyActivities.reduce((sum, act) => sum + (act.co2e || 0), 0);
        this.summaryData = { totalCo2e, monthName, year: currentYear };
        this.isLoading = false;
      },
      error: (err) => {
        console.error('EmissionSummary: Error loading activities:', err);
        this.error = 'Failed to load monthly summary data.';
        this.isLoading = false;
      }
    });
  }
}

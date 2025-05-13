import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartType, ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Activity, ActivityService } from '../../../core/services/activity.service';

@Component({
  selector: 'app-emission-chart',
  imports: [
    BaseChartDirective,
    CommonModule,
  ],
  templateUrl: './emission-chart.component.html',
  styleUrl: './emission-chart.component.css'
})
export class EmissionChartComponent implements OnInit {
  chartData: ChartData<'bar'> | null = null;
  isLoading: boolean = false;
  error: string | null = null;
  weekDates: Date[] = [];
  // public chartType: ChartType = 'bar';

  constructor(private activityService: ActivityService) { }

  ngOnInit(): void {
    this.loadWeeklyData();
  }

  loadWeeklyData(): void {
    this.isLoading = true;
    this.error = null;
    this.chartData = null;
    this.weekDates = [];

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const endDate = new Date(today)

      ;
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 6);

    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      this.weekDates.push(new Date(d));
    }

    console.log(`Emissions chart: Loading weekly data from ${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}`);

    this.activityService.getAllActivities().subscribe({
      next: (activities) => {
        console.log('EmissionChart: Activities:', activities);
        const allActivities = (activities && Array.isArray(activities)) ? activities : [];
        const weeklyActivities = allActivities.filter(activity => {
          if (!activity.timestamp) return false;
          const activityDate = new Date(activity.timestamp);
          const activityDayStart = new Date(activityDate.getFullYear(), activityDate.getMonth(), activityDate.getDate(), 0, 0, 0, 0);
          return activityDayStart >= startDate && activityDayStart <= endDate;
        });

        this.chartData = this.processActivitiesForWeeklyChart(weeklyActivities, this.weekDates, startDate, endDate);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('EmissionChart: Error loading activities:', err);
        this.error = 'Failed to load activities';
        this.isLoading = false;
      }
    });
  }

  processActivitiesForWeeklyChart(activities: Activity[], dates: Date[], startDate: Date, endDate: Date): ChartData<'bar'> {
    console.log('EmissionChart: Processing activities for weekly chart:', activities);
    console.log('EmissionChart: Dates:', dates);
    const dailyTotals = new Array(dates.length).fill(0);

    activities.forEach(activity => {
      if (!activity.timestamp && typeof activity.co2e !== 'number') return;
      const activityDate = new Date(activity.timestamp);
      const activityDayStart = new Date(activityDate.getFullYear(), activityDate.getMonth(), activityDate.getDate(), 0, 0, 0, 0);

      const dateIndex = dates.findIndex(d => d.getTime() === activityDayStart.getTime());
      if (dateIndex !== -1) {
        dailyTotals[dateIndex] += activity.co2e;
      }
    });

    console.log('EmissionChart: Daily totals:', dailyTotals);

    return {
      labels: dates.map(d => d.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' })),
      datasets: [
        {
          data: dailyTotals,
          label: 'CO2e (kg) per Day',
          backgroundColor: 'rgba(54, 162, 235, 0.6)', // Example blue
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(54, 162, 235, 0.8)',
          hoverBorderColor: 'rgba(54, 162, 235, 1)',
        }
      ]
    }
  }

  // public chartData: ChartData<'bar'> = {
  //   labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  //   datasets: [
  //     {
  //       label: 'CO₂e (kg)',
  //       data: [6.2, 5.5, 7.1, 4.0, 6.8, 9.3, 8.1],
  //       backgroundColor: '#4CAF50',
  //     }
  //   ]
  // };

  public chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false, // Good for fitting in a card
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'CO2e (kg)'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Date'
        }
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
      }
    }
  }
}

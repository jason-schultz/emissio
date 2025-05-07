import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { EmissionSummaryComponent } from './emission-summary/emission-summary.component';
import { TopSourcesComponent } from './top-sources/top-sources.component';
import { EmissionChartComponent } from './emission-chart/emission-chart.component';
import { Activity, ActivityService } from '../../core/services/activity.service';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    EmissionChartComponent,
    EmissionSummaryComponent,
    PageHeaderComponent,
    TopSourcesComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  actiivities: Activity[] = [];

  constructor(private activityService: ActivityService) { }

  ngOnInit(): void {
    this.activityService.getAllActivities().subscribe((data) => {
      console.log('Activities:', data);
      this.actiivities = data;
    });
  }
}

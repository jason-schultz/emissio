import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { CardComponent } from '../../shared/components/card/card.component';
import { EmissionSummaryComponent } from './emission-summary/emission-summary.component';
import { TopSourcesComponent } from './top-sources/top-sources.component';
import { EmissionChartComponent } from './emission-chart/emission-chart.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    CardComponent,
    CommonModule,
    EmissionChartComponent,
    EmissionSummaryComponent,
    PageHeaderComponent,
    TopSourcesComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}

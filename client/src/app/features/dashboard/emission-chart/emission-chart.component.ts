import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartType, ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { CardComponent } from '../../../shared/components/card/card.component';

@Component({
  selector: 'app-emission-chart',
  imports: [
    BaseChartDirective,
    CardComponent,
    CommonModule,
  ],
  templateUrl: './emission-chart.component.html',
  styleUrl: './emission-chart.component.css'
})
export class EmissionChartComponent {
  public chartType: ChartType = 'bar';

  public chartData: ChartData<'bar'> = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'CO₂e (kg)',
        data: [6.2, 5.5, 7.1, 4.0, 6.8, 9.3, 8.1],
        backgroundColor: '#4CAF50',
      }
    ]
  };

  public chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: { display: true },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: 'kg CO₂e' },
      }
    }
  }
}

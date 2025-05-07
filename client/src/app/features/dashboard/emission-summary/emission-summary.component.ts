import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../../shared/components/card/card.component';


@Component({
  selector: 'app-emission-summary',
  imports: [CardComponent, CommonModule],
  templateUrl: './emission-summary.component.html',
  styleUrl: './emission-summary.component.css'
})
export class EmissionSummaryComponent {
  totalEmissions = 62.3;
}

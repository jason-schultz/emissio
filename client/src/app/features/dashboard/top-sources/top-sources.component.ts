import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../../shared/components/card/card.component';

@Component({
  selector: 'app-top-sources',
  imports: [CardComponent, CommonModule],
  templateUrl: './top-sources.component.html',
  styleUrl: './top-sources.component.css'
})
export class TopSourcesComponent {
  topSources = [
    { source: 'Driving', value: 38.1, emoji: '🚗' },
    { source: 'Electricity', value: 22.5, emoji: '💡' },
    { source: 'Natural Gas', value: 15.2, emoji: '🔥' },
  ];
}

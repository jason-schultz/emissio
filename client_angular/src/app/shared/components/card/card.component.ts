import { AfterContentInit, Component, ContentChild } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  hasHeader: boolean = false;
  hasFooter: boolean = false;

  @ContentChild('card-title') titleContent: any;

  ngAfterContentInit() {
    this.hasHeader = !!this.titleContent;
  }
}
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  @Input() text: string = '';
  @Input() icon?: string;
  @Input() variant: 'text' | 'outlined' | 'contained' | 'icon' = 'contained';
  @Input() color: 'primary' | 'accent' | 'warn' | 'default' = 'default';
  @Input() disabled: boolean = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() ariaLabel?: string;

  @Output() clickEvent = new EventEmitter<MouseEvent>();

  onClick(event: MouseEvent): void {
    if (!this.disabled) {
      this.clickEvent.emit(event);
    }
  }

  get isIconButton(): boolean {
    return this.variant === 'icon' && !!this.icon && !this.text;
  }
}

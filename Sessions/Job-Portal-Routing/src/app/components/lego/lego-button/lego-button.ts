import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export type LegoButtonVariant = 'red' | 'yellow' | 'blue' | 'green' | 'neutral';

@Component({
  selector: 'app-lego-button',
  imports: [CommonModule],
  templateUrl: './lego-button.html',
  styleUrl: './lego-button.css',
})
export class LegoButton {
  @Input() variant: LegoButtonVariant = 'blue';
  @Input() label: string = 'Click';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled: boolean = false;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Output() clicked = new EventEmitter<void>();

  get variantClass(): string {
    return `lego-btn--${this.variant}`;
  }

  get sizeClass(): string {
    return `lego-btn--${this.size}`;
  }

  onClick(): void {
    if (!this.disabled) {
      this.clicked.emit();
    }
  }
}

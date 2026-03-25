import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lego-card',
  imports: [CommonModule],
  templateUrl: './lego-card.html',
  styleUrl: './lego-card.css',
})
export class LegoCard {
  @Input() elevate: boolean = false;
  @Input() accent: 'red' | 'yellow' | 'blue' | 'green' | 'none' = 'none';

  get classes(): string {
    const base = 'lego-card';
    const elevated = this.elevate ? 'lego-card--elevated' : '';
    const accentClass = this.accent !== 'none' ? `lego-card--accent-${this.accent}` : '';
    return [base, elevated, accentClass].filter(Boolean).join(' ');
  }
}

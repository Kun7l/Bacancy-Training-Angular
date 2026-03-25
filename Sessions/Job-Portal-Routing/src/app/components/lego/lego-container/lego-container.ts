import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lego-container',
  imports: [CommonModule],
  templateUrl: './lego-container.html',
  styleUrl: './lego-container.css',
})
export class LegoContainer {
  @Input() color: 'red' | 'yellow' | 'blue' | 'green' | 'neutral' = 'neutral';
  @Input() padded: boolean = true;
  @Input() fullWidth: boolean = false;

  get classes(): string {
    return [
      'lego-container',
      `lego-container--${this.color}`,
      this.padded ? 'lego-container--padded' : '',
      this.fullWidth ? 'lego-container--full' : '',
    ].filter(Boolean).join(' ');
  }
}

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lego-chip',
  imports: [CommonModule],
  templateUrl: './lego-chip.html',
  styleUrl: './lego-chip.css',
})
export class LegoChip {
  @Input() label: string = '';
  @Input() color: 'red' | 'yellow' | 'blue' | 'green' = 'blue';
  @Input() icon: string = '';

  get chipClass(): string {
    return `lego-chip lego-chip--${this.color}`;
  }
}

import { CommonModule } from '@angular/common';
import { Component, input, computed } from '@angular/core';
import { StatusColorDirective } from "../../directives/status-color-directive";

export type BadgeVariant = 'wishlist' | 'applied' | 'interview' | 'offer';

@Component({
  selector: 'app-badge',
  imports: [CommonModule, StatusColorDirective],
  templateUrl: './badge.html',
  styleUrl: './badge.css',
})
export class BadgeComponent {
  
  variant = input<BadgeVariant>('wishlist');
  text = input<string>('');

  badgeClass = computed(() => {
    const v = this.variant();
    return v;
  });
}

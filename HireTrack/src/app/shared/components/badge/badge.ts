import { CommonModule } from '@angular/common';
import { Component, input, computed } from '@angular/core';

export type BadgeVariant = 'wishlist' | 'applied' | 'interview' | 'offer';

@Component({
  selector: 'app-badge',
  imports: [CommonModule],
  templateUrl: './badge.html',
  styleUrl: './badge.css',
})
export class BadgeComponent {
  // ✅ signal input
  variant = input<BadgeVariant>('wishlist');
  text = input<string>('');

  // ✅ computed class based on variant
  badgeClass = computed(() => {
    const v = this.text();
    return v;
  });
}

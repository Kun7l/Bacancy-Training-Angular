// shared/directives/status-color.directive.ts

import { Directive, input, computed, HostBinding } from '@angular/core';
import { BadgeVariant } from '../components/badge/badge';

const STATUS_COLORS: Record<BadgeVariant, { bg: string; color: string }> = {
  wishlist:  { bg: '#dbeafe', color: '#1e3a8a' },
  applied:   { bg: '#fef3c7', color: '#92400e' },
  interview: { bg: '#fee2e2', color: '#991b1b' },
  offer:     { bg: '#d1fae5', color: '#065f46' },
};

@Directive({
  selector: '[appStatusColor]',
  standalone: true,
})
export class StatusColorDirective {
  appStatusColor = input<BadgeVariant>('wishlist');

  private colors = computed(() => {
    return STATUS_COLORS[this.appStatusColor()] ?? STATUS_COLORS['wishlist'];
  });

  @HostBinding('style.backgroundColor') get bg() {
    return this.colors().bg;
  }

  @HostBinding('style.color') get color() {
    return this.colors().color;
  }
}
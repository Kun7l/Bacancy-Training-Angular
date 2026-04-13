import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'relativeDatePipe',
})
export class RelativeDatePipePipe implements PipeTransform {
  transform(value: Date | null | undefined, ...args: unknown[]): string {
    if (value === null || value === undefined) return '';
    const now = new Date();
    const diff = now.getTime() - new Date(value).getTime();
    const diffInDays = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) {
      return 'Today';
    } else if (diffInDays === 1) {
      return 'Yesterday';
    } else {
      return `${diffInDays} days ago`;
    }
  }
}

import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-toast',
  imports: [],
  templateUrl: './toast.html',
  styleUrl: './toast.css',
})
export class Toast implements OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    setTimeout(() => {
      this.toastExpired.emit();
    }, 2000);
  }
  @Input() message = '';
  @Output() toastExpired = new EventEmitter<void>();
}

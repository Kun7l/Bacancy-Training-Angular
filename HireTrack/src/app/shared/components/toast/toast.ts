import { Component, OnInit, signal } from '@angular/core';
import { ErrorService } from '../../../core/services/error-service';
import { CdkDropList } from '@angular/cdk/drag-drop';
import { ToastType } from '../../types/toast.type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  imports: [CommonModule],
  templateUrl: './toast.html',
  styleUrl: './toast.css',
})
export class Toast {
  constructor(private errorService: ErrorService) {}
  protected toastType: ToastType = ToastType.Success;
  protected message = signal<string | null>(null);

  ngOnInit() {
    this.errorService.getErrorMessage().subscribe((data) => {
      if (data) {
        this.toastType = data.type;
        this.message.set(data.message);
      } else {
        this.message.set(null);
      }
    });
  }

  toastCancel() {
    this.errorService.clearErrorMessage();
  }
}

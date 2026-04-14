import { Component, OnInit, signal, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MessageService } from '../../../core/services/messageService';
import { CdkDropList } from '@angular/cdk/drag-drop';
import { ToastType } from '../../types/toast.type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  imports: [CommonModule],
  templateUrl: './toast.html',
  styleUrl: './toast.css',
})
export class Toast implements OnInit {
  constructor(private messageService: MessageService) {}
  protected toastType: ToastType = ToastType.Success;
  protected message = signal<string | null>(null);
  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.messageService.getErrorMessage().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((data) => {
      if (data) {
        this.toastType = data.type;
        this.message.set(data.message);
      } else {
        this.message.set(null);
      }
    });
  }

  toastCancel() {
    this.messageService.clearErrorMessage();
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastType } from '../../shared/types/toast.type';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private errorMessage = new BehaviorSubject<{
    message: string;
    type: ToastType;
  } | null>(null);
  private timer: ReturnType<typeof setTimeout> | null = null;
  private getMessageFromError(error: HttpErrorResponse): string {
    switch (true) {
      case error.status === 400:
        return 'Bad request. Please check your input.';
      case error.status === 401:
        return 'Unauthorized. Please log in again.';
      case error.status === 403:
        return 'You do not have permission to do that.';
      case error.status === 404:
        return 'Resource not found.';
      case error.status === 408:
        return 'Request timed out. Please try again.';
      case error.status === 422:
        return 'Invalid data submitted. Check your form.';
      case error.status >= 500:
        return 'Server error. Please try again later.';
      default:
        return 'Something went wrong. Please try again.';
    }
  }

  getErrorMessage() {
    return this.errorMessage.asObservable();
  }

  setErrorMessage(error: HttpErrorResponse) {
    const message = this.getMessageFromError(error);
    if (this.timer) clearTimeout(this.timer);
    this.errorMessage.next({ message: message, type: ToastType.Error });
    this.timer = setTimeout(() => this.errorMessage.next(null), 4000);
  }
  setSuccessMessage(message: string) {
    if (this.timer) clearTimeout(this.timer);
    this.errorMessage.next({ message: message, type: ToastType.Success });
    this.timer = setTimeout(() => this.errorMessage.next(null), 4000);
  }
  setInfoMessage(message: string) {
    if (this.timer) clearTimeout(this.timer);
    this.errorMessage.next({ message: message, type: ToastType.Info });
    this.timer = setTimeout(() => this.errorMessage.next(null), 4000);
  }
  setDangerMessage(message: string) {
    if (this.timer) clearTimeout(this.timer);
    this.errorMessage.next({ message: message, type: ToastType.Error });
    this.timer = setTimeout(() => this.errorMessage.next(null), 4000);
  }

  clearErrorMessage() {
    if (this.timer) clearTimeout(this.timer);
    this.errorMessage.next(null);
  }
}

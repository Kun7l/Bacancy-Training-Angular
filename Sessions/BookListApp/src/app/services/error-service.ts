import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  private readonly errorMessageSubject = new BehaviorSubject<string>('');
  readonly errorMessage$ = this.errorMessageSubject.asObservable();

  notifyError(error: unknown) {
    const message =
      typeof error === 'string'
        ? error
        : error instanceof Error
          ? error.message
          : 'An unexpected error occurred';

    this.errorMessageSubject.next(message);
  }

  clearError() {
    this.errorMessageSubject.next('');
  }
}

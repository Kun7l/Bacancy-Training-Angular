import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { ErrorService } from '../../services/error-service';

@Component({
  selector: 'app-error-toast',
  imports: [AsyncPipe],
  templateUrl: './error-toast.html',
  styleUrl: './error-toast.css',
})
export class ErrorToast {
  readonly errorMessage$;

  constructor(private errorService: ErrorService) {
    this.errorMessage$ = this.errorService.errorMessage$;
  }
  
  clearError() {
    this.errorService.clearError();
  }
}

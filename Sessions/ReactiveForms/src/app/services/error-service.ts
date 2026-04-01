import { Injectable, Input } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  errorMessageMap: Record<string, string> = {
    required: 'this field is required',
    minlength: 'this field should have minimum length of 5',
    email: 'this field should be a valid email',
    invalidPhoneNumber: 'this field should be a valid phone number',
    duplicateProjectName: 'project name should be unique',
    invalidDateRange: 'start date should be before end date',
  };

  hasError(
    control: AbstractControl | null,
    isSubmitted: boolean,
    errorCode: string,
  ): string | null {
    if (!control) return null;
    if ((control.touched || isSubmitted) && control.hasError(errorCode)) {
      return this.errorMessageMap[errorCode] || 'Invalid field';
    }
    return null;
  }
}

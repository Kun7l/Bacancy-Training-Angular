import { Injectable } from '@angular/core';
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
  };

  hasError(control: AbstractControl | null, errorCode: string): string | null {
    if (!control) return null;
    if (control.touched && control.hasError(errorCode)) {
      return this.errorMessageMap[errorCode] || 'Invalid field';
    }
    return null;
  }
}

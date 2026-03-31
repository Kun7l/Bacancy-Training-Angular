import { AbstractControl, ValidationErrors } from '@angular/forms';

export function phoneNumberValidator(
  control: AbstractControl,
): ValidationErrors | null {
  if (!control.value) return null;
  const phoneNumber = control.value.toString();
  const cleanedPhoneNumber = phoneNumber.replace(/\s/g, '');
  const phoneNumberPattern = /^(\+91)\d{10}$/;

  if (!phoneNumberPattern.test(cleanedPhoneNumber)) {
    return { invalidPhoneNumber: true };
  }
  return null;
}
    
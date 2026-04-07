import { AbstractControl, ValidationErrors } from '@angular/forms';

export function rangeValidator(
  control: AbstractControl,
): ValidationErrors | null {
  const formGroup = control.value;
  const startRange = control.get('startRange');
  const endRange = control.get('endRange');

  if (startRange?.value != null && endRange?.value != null) {
    const isRangeValid = startRange?.value < endRange?.value;
    return isRangeValid ? null : { rangeError: true };
  }
  return null;
}

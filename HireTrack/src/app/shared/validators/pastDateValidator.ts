import { AbstractControl, ValidationErrors } from '@angular/forms';

export function PastDateValidator(
  control: AbstractControl,
): ValidationErrors | null {
  const value = control.value;
  if (!value) return null;

  const inputDate = new Date(value);
  if (Number.isNaN(inputDate.getTime())) return { invalidDate: true };

  // Compare date-only values so timezones/time-of-day do not cause false positives.
  const selectedDate = new Date(inputDate.getFullYear(), inputDate.getMonth(), inputDate.getDate());
  const today = new Date();
  const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  if (selectedDate > todayDate) {
    return { futureDate: true };
  }
  return null;
}
    
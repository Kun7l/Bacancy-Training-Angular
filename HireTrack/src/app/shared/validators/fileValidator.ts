import { FormControl, ValidationErrors } from '@angular/forms';

export function FileValidator(control: FormControl): ValidationErrors | null {
  const file: File = control.value;
  if (!file) return null;
  if (file.type !== 'application/pdf') {
    return { invalidFileType: true };
  }
  return null;
}

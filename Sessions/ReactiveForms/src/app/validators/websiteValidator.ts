import { AbstractControl, FormArray, ValidationErrors } from '@angular/forms';

export function websiteValidator(
  control: AbstractControl,
): ValidationErrors | null {
  const website = control.value;

  if (!website) {
    return null;
  }

  const websiteRegex =
    /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;
  const valid = websiteRegex.test(website);

  return valid ? null : { invalidWebsite: true };
}

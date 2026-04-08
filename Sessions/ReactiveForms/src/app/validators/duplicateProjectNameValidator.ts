import { AbstractControl, FormArray, ValidationErrors } from '@angular/forms';

export function duplicateProjectNameValidator(formArray: FormArray) {
  return (control: AbstractControl): ValidationErrors | null => {
    const currentValue = control.value?.toLowerCase().trim();

    if (!currentValue) return null;

    const isDuplicate = formArray.controls.some((project) => {
      const nameControl = project.get('name');

      // skip itself
      if (nameControl === control) return false;

      return nameControl?.value?.toLowerCase().trim() === currentValue;
    });

    return isDuplicate ? { duplicateProjectName: true } : null;
  };
}

import { AbstractControl, FormArray, FormGroup, ValidationErrors } from '@angular/forms';

export function dateValidator(
  control: AbstractControl,
): ValidationErrors | null {
  const project = control as FormGroup;
  if (!project) return null;

  if (project.get('startDate') && project.get('endDate')) {
    const startDate = new Date(project.get('startDate')?.value);
    const endDate = new Date(project.get('endDate')?.value);
    if (startDate > endDate) {
      return { invalidDateRange: true };
    }
    else{
        return null;
    }
  }
  return null;
}

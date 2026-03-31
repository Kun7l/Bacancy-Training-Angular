import { AbstractControl, FormArray, ValidationErrors } from '@angular/forms';

export function duplicateProjectNameValidator(
  control: AbstractControl,
): ValidationErrors | null {
  const projects = control.get('projects') as FormArray;
  if (!projects) return null;

  const projectNames = projects.controls.map((project) =>
    project.get('name')?.value?.toLowerCase().trim(),
  );
  const uniqueProjectNames = new Set(projectNames);

  return uniqueProjectNames.size !== projectNames.length
    ? { duplicateProjectName: true }
    : null;
}

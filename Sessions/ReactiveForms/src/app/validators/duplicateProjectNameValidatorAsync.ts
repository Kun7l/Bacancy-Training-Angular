import { AbstractControl, FormArray, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export function duplicateProjectNameValidatorAsync(
  control: AbstractControl,
): Observable<ValidationErrors | null> {
  const defaultProjectNames = ['Project Alpha', 'Project Beta', 'Project Gamma'];
  const projects = control.get('projects') as FormArray;
  if (!projects) return of(null);

  const projectNames = projects.controls.map((project) =>
    project.get('name')?.value?.toLowerCase().trim(),
  );

  const uniqueProjectNames = new Set(projectNames);

  return uniqueProjectNames.size !== projectNames.length
    ? of({ duplicateProjectName: true }).pipe(delay(0))
    : of(null).pipe(delay(0));
}

import { CanDeactivate, CanDeactivateFn } from '@angular/router';
import { AddJob } from '../../features/add-job/add-job';

export const unsavedChanges: CanDeactivateFn<AddJob> = (component) => {

  if (component.addJobForm.dirty && !component.isSavedFn()) {
    return confirm('You have unsaved changes. Do you really want to leave?');
  }
  return true;
};

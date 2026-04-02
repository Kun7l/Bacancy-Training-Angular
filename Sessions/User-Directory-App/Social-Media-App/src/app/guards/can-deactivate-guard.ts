import { inject } from '@angular/core';
import { CanDeactivateFn } from '@angular/router';
import { PostService } from '../services/post-service';
import { PostForm } from '../components/post-form/post-form';

export const canDeactivateGuard: CanDeactivateFn<PostForm> = (component) => {
  if (!component.isSavedFn()) {
    return confirm('You have unsaved changes. Do you really want to leave?');
  }
  return true;
};

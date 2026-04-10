import { Routes } from '@angular/router';
import { Dashboard } from './features/dashboard/dashboard';
import { authGuard } from './core/guards/auth-guard';
import { Login } from './features/login/login';
import { JobDetail } from './features/job-detail/job-detail';
import { AddJob } from './features/add-job/add-job';
import { NotFound } from './shared/components/not-found/not-found';
import { unsavedChanges } from './core/guards/unsaved-changes-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard],
  },
  {
    path: 'jobs/:id',
    component: JobDetail,
    canActivate: [authGuard],
  },
  {
    path: 'add',
    component: AddJob,
    canActivate: [authGuard],
    canDeactivate: [unsavedChanges],
  },
  {
    path: 'not-found',
    component: NotFound,
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];

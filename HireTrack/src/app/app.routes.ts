import { Routes } from '@angular/router';
import { Dashboard } from './features/dashboard/dashboard';
import { authGuard } from './core/guards/auth-guard';
import { Login } from './features/login/login';
import { JobDetail } from './features/job-detail/job-detail';
import { AddJob } from './features/add-job/add-job';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard],
  },
  {
    path: 'login',
    component: Login,
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
  },
];

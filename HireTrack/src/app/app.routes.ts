import { Routes } from '@angular/router';
import { Dashboard } from './features/dashboard/dashboard';
import { authGuard } from './core/guards/auth-guard';
import { Login } from './features/login/login';
import { JobDetail } from './features/job-detail/job-detail';
import { AddJob } from './features/add-job/add-job';
import { NotFound } from './shared/components/not-found/not-found';
import { unsavedChanges } from './core/guards/unsaved-changes-guard';
import { UploadResume } from './features/upload-resume/upload-resume';
import { MainLayout } from './shared/layout/main-layout/main-layout';

export const routes: Routes = [
  // Main layout with navbar
  {
    path: '',
    component: MainLayout,
    children: [
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
        path: 'upload-resume',
        component: UploadResume,
      },
    ],
  },

  // Public routes (no navbar)
  {
    path: 'login',
    component: Login,
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

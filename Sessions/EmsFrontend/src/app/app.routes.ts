import { Routes } from '@angular/router';
import { CreateEventPage } from './pages/create-event/create-event.page';
import { HomePage } from './pages/home/home.page';
import { LoginPage } from './pages/login/login.page';
import { ViewAllEventsPage } from './pages/view-all-events/view-all-events.page';
import { AuthGuard } from './guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'login',
    component: LoginPage,
  },
  {
    path: 'home',
    component: HomePage,
    canActivate: [AuthGuard],
  },
  {
    path: 'events',
    component: ViewAllEventsPage,
    canActivate: [AuthGuard],
  },
  {
    path: 'events/create',
    component: CreateEventPage,
    canActivate: [AuthGuard],
  },

  {
    path: '**',
    redirectTo: 'login',
  },
];

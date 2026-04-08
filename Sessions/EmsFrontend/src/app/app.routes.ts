import { Routes } from '@angular/router';
import { CreateEventPage } from './pages/create-event/create-event.page';
import { HomePage } from './pages/home/home.page';
import { LoginPage } from './pages/login/login.page';
import { ViewAllEventsPage } from './pages/view-all-events/view-all-events.page';

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
  },
  {
    path: 'events',
    component: ViewAllEventsPage,
  },
  {
    path: 'events/create',
    component: CreateEventPage,
  },

  {
    path: '**',
    redirectTo: 'login',
  },
];

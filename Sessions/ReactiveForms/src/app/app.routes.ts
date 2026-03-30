import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { PageNotFound } from './components/page-not-found/page-not-found';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'not-found', component: PageNotFound },
  { path: '**', redirectTo: 'not-found' },
];

import { Routes } from '@angular/router';
import { PageNotFound } from './components/page-not-found/page-not-found';
import { Home } from './pages/home/home';
import { MainLayout } from './layout/main-layout/main-layout';
import { User } from './pages/user/user';
import { Posts } from './pages/posts/posts';
import { Login } from './pages/login/login';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      { path: '', component: Home },
      {
        path: 'user',
        component: User,
        children: [{ path: 'posts', component: Posts }],
      },
    ],
  },
  { path: 'login', component: Login },
  { path: 'not-found', component: PageNotFound },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];

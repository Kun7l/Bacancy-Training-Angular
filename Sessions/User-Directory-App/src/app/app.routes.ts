import { Routes } from '@angular/router';
import { NotFound } from './components/not-found/not-found';
import { MainLayout } from './layout/main-layout/main-layout';
import { Users } from './pages/users/users';
import { UserDetails } from './components/user-details/user-details';
import { PostDetails } from './components/post-details/post-details';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/users',
    pathMatch: 'full',
  },
  {
    path: 'users',
    component: MainLayout,
    children: [
      { path: '', component: Users },
      {
        path: ':id',
        component: UserDetails,
        children: [{ path: 'posts', component: PostDetails }],
      },
    ],
  },
  { path: 'not-found', component: NotFound },
  { path: '**', redirectTo: '/not-found' },
];

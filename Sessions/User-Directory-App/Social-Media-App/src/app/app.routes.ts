import { Routes } from '@angular/router';
import { PageNotFound } from './components/page-not-found/page-not-found';
import { Home } from './pages/home/home';
import { MainLayout } from './layout/main-layout/main-layout';
import { User } from './pages/user/user';
import { Posts } from './pages/social-media-feed/social-media-feed';
import { Login } from './pages/login/login';
import { AuthGuard } from './guards/auth-guard';
import { PostForm } from './components/post-form/post-form';
import { canDeactivateGuard } from './guards/can-deactivate-guard';
import { postsResolver } from './guards/resolver-guard';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      { path: '', component: Home },
      {
        path: 'user',
        component: User,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
          {
            path: 'posts',
            component: Posts,
            resolve: { posts: postsResolver },
          },
          {
            path: 'posts/create',
            component: PostForm,
            canDeactivate: [canDeactivateGuard],
          },
        ],
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

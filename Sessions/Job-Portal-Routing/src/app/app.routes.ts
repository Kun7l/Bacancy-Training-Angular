import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Contact } from './pages/contact/contact';
import { Jobs } from './pages/jobs/jobs';
import { NotFound } from './pages/not-found/not-found';
import { MainLayout } from './layouts/main-layout/main-layout';
import { JobDetail } from './components/job-detail/job-detail';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      { path: '', component: Home },
      { path: 'about', component: About },
      { path: 'contact', component: Contact },
      { path: 'jobs', component: Jobs },
      { path: 'jobs/:id', component: JobDetail },
    ],
  },
  { path: '**', component: NotFound },
];

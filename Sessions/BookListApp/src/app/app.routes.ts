import { Routes } from '@angular/router';
import { BookList } from './components/book-list/book-list';
import { BookAddForm } from './components/book-add-form/book-add-form';
import { dataResolver } from './guards/resolve-guard';

export const routes: Routes = [
  { path: '', redirectTo: '/books', pathMatch: 'full' },
  {
    path: 'books',
    component: BookList,
    resolve: { data: dataResolver },
  },
  { path: 'add', component: BookAddForm },
];

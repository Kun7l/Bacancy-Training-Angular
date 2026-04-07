// post.resolver.ts
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { BookDetailsDTO } from '../types/bookdto.type';
import { BookServices } from '../services/book-services';
import { catchError, map, of } from 'rxjs';
import { ErrorService } from '../services/error-service';

export const dataResolver: ResolveFn<Record<string, BookDetailsDTO> | null> = (
  route,
  state,
) => {
  const bookService = inject(BookServices);
  const errorService = inject(ErrorService);
  return bookService.getAllBooks().pipe(
    map((books) => books ?? null),
    catchError((err) => {
      errorService.notifyError(err);
      return of(null);
    }),
  );
};

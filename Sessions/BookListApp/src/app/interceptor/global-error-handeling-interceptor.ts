import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ErrorService } from '../services/error-service';
import { catchError, throwError } from 'rxjs';

export const globalErrorHandelingInterceptor: HttpInterceptorFn = (
  req,
  next,
) => {
  const errorService = inject(ErrorService);
  const newReq = req.clone();

  return next(newReq).pipe(
    catchError((error: HttpErrorResponse) => {
      const errorMsg = 'global error handeling: an error occured';
      errorService.notifyError(errorMsg);
      return throwError(() => error);
    }),
  );
};

import { HttpInterceptorFn } from '@angular/common/http';

export const globalErrorHandelingInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};

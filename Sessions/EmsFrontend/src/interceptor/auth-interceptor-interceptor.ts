import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../app/services/auth-service';
import { inject } from '@angular/core';

export const authInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();
  console.log('auth interceptor', token);

  if (token) {
    const newReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(newReq);
  }

  return next(req);
};

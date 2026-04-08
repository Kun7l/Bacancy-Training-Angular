import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from './services/auth-service';
import { inject } from '@angular/core';

export const authInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const newReq = req.clone();
  const token = authService.getToken();
  if (token) {
    newReq.headers.set('Authorization', `Bearer ${token}`);
  }
  return next(newReq);
};

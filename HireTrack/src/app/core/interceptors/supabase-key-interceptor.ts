import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth-service';

export const supabaseKeyInterceptor: HttpInterceptorFn = (req, next) => {
  const supabaseKey = environment.supabaseKey;
  const authService = inject(AuthService);

  const newReq = req.clone({
    setHeaders: {
      apiKey: supabaseKey,
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });

  return next(newReq);
};

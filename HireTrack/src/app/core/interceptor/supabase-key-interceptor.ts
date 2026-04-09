import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment';

export const supabaseKeyInterceptor: HttpInterceptorFn = (req, next) => {
  const supabaseKey = environment.supabaseKey;

  const newReq = req.clone({
    setHeaders: {
      apiKey: supabaseKey,
    },
  });

  return next(newReq);
};

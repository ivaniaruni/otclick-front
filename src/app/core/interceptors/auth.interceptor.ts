import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { from, switchMap } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const authService = inject(AuthService);

  // Login y registro no necesitan token.
  if (
    request.url.endsWith('/auth/login') ||
    request.url.endsWith('/auth/register')
  ) {
    return next(request);
  }

  return from(authService.getToken()).pipe(
    switchMap((token) => {
      const outgoing = token
        ? request.clone({
            setHeaders: { Authorization: `Bearer ${token}` }
          })
        : request;

      return next(outgoing);
    })
  );
};

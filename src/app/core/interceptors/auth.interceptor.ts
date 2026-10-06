import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { from, switchMap } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const authService = inject(AuthService);

  const isPublicAuthRequest =
    request.url.includes('/auth/login') ||
    request.url.includes('/auth/register');

  if (isPublicAuthRequest) {
    return next(request);
  }

  return from(authService.getToken()).pipe(
    switchMap((token) => {
      if (!token) {
        return next(request);
      }

      const authenticatedRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });

      return next(authenticatedRequest);
    })
  );
};

import { HttpInterceptorFn } from '@angular/common/http';
import { StorageHelper } from '../../helpers/storage.helper';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { APP_CONSTANTS } from '../../constants/app.constants';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = StorageHelper.getItem<string>('auth_token');
  const authservice = inject(AuthService);
  const router = inject(Router);
  let authReq = req;
  if (token) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(authReq).pipe(
    catchError((error) => {
      if ((error.error.status = 401)) {
        authservice.logout();
        router.navigate(['/auth/login']);
      }
      return throwError(() => error);
    }),
  );
};

import { HttpInterceptorFn } from '@angular/common/http';
import { StorageHelper } from '../../helpers/storage.helper';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { APP_CONSTANTS } from '../../constants/app.constants';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = StorageHelper.getItem<string>('auth_token');
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
      return throwError(() => error);
    }),
  );
};

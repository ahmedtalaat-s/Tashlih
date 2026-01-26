import { HttpInterceptorFn } from '@angular/common/http';
import { StorageHelper } from '../../helpers/storage.helper';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { APP_CONSTANTS } from '../../constants/app.constants';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = StorageHelper.getItem(APP_CONSTANTS.STORAGE_KEYS.TOKEN);

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `${token}`,
      },
    });
  }

  return next(req).pipe(
    catchError((error) => {
      return throwError(() => error);
    }),
  );
};

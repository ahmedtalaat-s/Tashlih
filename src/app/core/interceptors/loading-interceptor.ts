import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { SpinnerService } from '../services/spinner.service';
import { inject } from '@angular/core';
import { catchError, finalize, throwError } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const spinnerService = inject(SpinnerService);
  spinnerService.show();
  return next(req).pipe(
    finalize(() => {
      spinnerService.hide();
    }),
    catchError((error: HttpErrorResponse) => {
      spinnerService.hide();
      return throwError(() => error);
    }),
  );
};

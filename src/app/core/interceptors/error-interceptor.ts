import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { ToastService } from '../services/toast.service';
import { inject, Injector } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { LanguageService } from '../services/language.service';

let toastService: ToastService | null = null;
let languageService: LanguageService | null = null;
let injector: Injector | null = null;

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  if (!injector) {
    injector = inject(Injector);
  }
  if (!languageService) {
    languageService = injector!.get(LanguageService);
  }
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (!toastService) {
        toastService = injector!.get(ToastService);
      }
      if (error.status === 401) {
        languageService?.defaultLanguage() === 'ar'
          ? toastService.error(
              'غير مصرح',
              'انتهت جلسة العمل الخاصة بك. الرجاء تسجيل الدخول مرة أخرى.',
            )
          : toastService.error('Unauthorized', 'Your session has expired. Please log in again.');
      } else {
        const message = extractErrorMessage(error, languageService?.defaultLanguage() || 'ar');
        languageService?.defaultLanguage() === 'ar'
          ? toastService.error('خطأ', message)
          : toastService.error('Error', message);
      }
      return throwError(() => error);
    }),
  );
};

function extractErrorMessage(error: HttpErrorResponse, language: string): string {
  if (languageService?.defaultLanguage() === 'ar') {
    return (
      error.error?.error?.messageAr ||
      error.error?.value?.messageAr ||
      error.error?.messageAr ||
      error.error?.message ||
      error.message ||
      'حدث خطأ غير متوقع. الرجاء المحاولة مرة أخرى لاحقًا.'
    );
  }
  return (
    error.error?.error?.message ||
    error.error?.value?.message ||
    error.error?.message ||
    error.message ||
    'Unexpected error'
  );
}

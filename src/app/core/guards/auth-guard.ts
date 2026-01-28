import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { StorageHelper } from '../../helpers/storage.helper';
import { APP_CONSTANTS } from '../../constants/app.constants';
import { isPlatformBrowser } from '@angular/common';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = StorageHelper.getItem<string>(APP_CONSTANTS.STORAGE_KEYS.TOKEN);
  const platformId = inject(PLATFORM_ID);

  const isBrowser = isPlatformBrowser(platformId);

  if (!isBrowser) return true;

  if (authService.isloggedIn() || token) {
    return true;
  }

  router.navigate(['/auth/login']);
  return false;
};

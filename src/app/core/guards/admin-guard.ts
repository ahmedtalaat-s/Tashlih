import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { APP_CONSTANTS } from '../../constants/app.constants';
import { StorageHelper } from '../../helpers/storage.helper';
import { Admin } from '../models/admin.model';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const admin = StorageHelper.getItem<Admin>(APP_CONSTANTS.STORAGE_KEYS.ADMIN);
  const platformId = inject(PLATFORM_ID);

  const isBrowser = isPlatformBrowser(platformId);

  if (!isBrowser) return true;

  if (admin && admin != null) {
    return true;
  }

  router.navigate(['/admin/login']);
  return false;
};

import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { APP_CONSTANTS } from '../../constants/app.constants';
import { StorageHelper } from '../../helpers/storage.helper';
import { Admin } from '../models/admin.model';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = StorageHelper.getItem<string>(APP_CONSTANTS.STORAGE_KEYS.TOKEN);
  const role: role | null = StorageHelper.getItem<role>(APP_CONSTANTS.STORAGE_KEYS.ROLE);

  if (token && role == 'admin') {
    return true;
  } else if (token && role == 'supplier') {
    router.navigate(['/supplier']);
    return false;
  } else if (token && role == 'customer') {
    router.navigate(['/']);
    return false;
  }
  router.navigate(['/admin/login']);
  return false;
};

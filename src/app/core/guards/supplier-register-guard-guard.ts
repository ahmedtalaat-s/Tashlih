import { CanActivateFn, Router } from '@angular/router';
import { SupplierRegisterStore } from '../../features/auth/register/supplier/supplier-register.store';
import { inject } from '@angular/core';

export const supplierRegisterGuardGuard: CanActivateFn = (route, state) => {
  const store = inject(SupplierRegisterStore);
  const router = inject(Router);

  if (store.hasData()) {
    return true;
  }

  router.navigate(['auth/register/supplier/info']);
  return false;
};

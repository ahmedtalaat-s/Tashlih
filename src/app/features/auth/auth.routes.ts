import { Routes } from '@angular/router';
import { register } from 'module';
import path from 'path';
export const authRoutes: Routes = [
  {
    path: 'register',
    children: [
      {
        path: 'choose-account',
        loadComponent: () => import('./register/choose-role/choose-role').then((m) => m.ChooseRole),
      },
      {
        path: 'customer',
        loadComponent: () =>
          import('./register/customer/customer-register-form/customer-register-form').then(
            (m) => m.CustomerRegisterForm
          ),
      },
      {
        path: 'supplier-info',
        loadComponent: () =>
          import('./register/supplier/supplier-register-info/supplier-register-info').then(
            (m) => m.SupplierRegisterInfo
          ),
      },
      {
        path: 'bussiness-info',
        loadComponent: () =>
          import(
            './register/supplier/supplier-register-business-info/supplier-register-business-info'
          ).then((m) => m.SupplierRegisterBusinessInfo),
      },
      {
        path: 'supplier-files',
        loadComponent: () =>
          import('./register/supplier/supplier-register-files/supplier-register-files').then(
            (m) => m.SupplierRegisterFiles
          ),
      },
    ],
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login').then((m) => m.Login),
  },
];

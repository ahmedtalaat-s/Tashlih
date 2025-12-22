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
    ],
  },
];

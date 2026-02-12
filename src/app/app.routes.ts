import { Routes } from '@angular/router';
import { Authlayout } from './features/layouts/authlayout/authlayout';
import { Mainlayout } from './features/layouts/mainlayout/mainlayout';
import path from 'path';

export const routes: Routes = [
  {
    path: '',
    component: Mainlayout,
    children: [
      {
        path: '',
        loadChildren: () => import('./features/public/public.routes').then((r) => r.routes),
      },
      {
        path: 'customer',
        loadChildren: () => import('./features/customer/customer.routes').then((r) => r.routes),
      },
    ],
  },
  {
    path: 'auth',
    component: Authlayout,
    children: [
      {
        path: '',
        loadChildren: () => import('./features/auth/auth.routes').then((m) => m.authRoutes),
      },
    ],
  },
  {
    path: 'admin',
    loadChildren: () => import('./features/admin/admin.routes').then((m) => m.routes),
  },
  { path: '**', redirectTo: '' },
];

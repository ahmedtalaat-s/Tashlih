import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth-guard';
import { adminGuard } from '../../core/guards/admin-guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
  {
    path: 'login',
    loadComponent: () => import('./auth/auth').then((m) => m.Auth),
  },
  {
    path: 'dashboard',
    canActivate: [adminGuard],
    loadComponent: () => import('./dashboard/dashboard').then((m) => m.Dashboard),
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'statistics',
      },
      {
        path: 'statistics',
        loadComponent: () =>
          import('./dashboard/statisticspanel/statisticspanel').then((r) => r.Statisticspanel),
      },
      {
        path: 'suppliers',
        loadComponent: () =>
          import('./dashboard/supplier-management/supplier-management').then(
            (r) => r.SupplierManagement,
          ),
      },
      {
        path: 'customers',
        loadComponent: () =>
          import('./dashboard/customer-management/customer-management').then(
            (r) => r.CustomerManagement,
          ),
      },
      {
        path: 'parts',
        loadComponent: () =>
          import('./dashboard/parts-management/parts-management').then((r) => r.PartsManagement),
      },
      {
        path: 'requests',
        loadComponent: () =>
          import('./dashboard/verification-requests/verification-requests').then(
            (r) => r.VerificationRequests,
          ),
      },
      {
        path: 'subscribtions',
        loadComponent: () =>
          import('./dashboard/subscribtion-plans/subscribtion-plans').then(
            (r) => r.SubscribtionPlans,
          ),
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'plans',
          },
          {
            path: 'plans',
            loadComponent: () =>
              import('./dashboard/subscribtion-plans/plans/plans').then((p) => p.Plans),
          },
          {
            path: 'subscribers',
            loadComponent: () =>
              import('./dashboard/subscribtion-plans/subscribers/subscribers').then(
                (p) => p.Subscribers,
              ),
          },
        ],
      },
      {
        path: 'information',
        loadComponent: () =>
          import('./dashboard/information/information').then((r) => r.Information),
      },
      {
        path: 'history',
        loadComponent: () =>
          import('./dashboard/transaction-log/transaction-log').then((r) => r.TransactionLog),
      },
    ],
  },
];

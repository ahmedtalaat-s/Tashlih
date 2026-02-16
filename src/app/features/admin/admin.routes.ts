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
        children: [
          {
            path: 'categories',
            loadComponent: () =>
              import('./dashboard/parts-management/tables/categories/categories').then(
                (c) => c.Categories,
              ),
          },
          {
            path: 'subcategories',
            loadComponent: () =>
              import('./dashboard/parts-management/tables/subcategories/subcategories').then(
                (c) => c.Subcategories,
              ),
          },
          {
            path: 'vehicles',
            loadComponent: () =>
              import('./dashboard/parts-management/tables/vehicles/vehicles').then(
                (c) => c.Vehicles,
              ),
          },
          {
            path: 'manufacturers',
            loadComponent: () =>
              import('./dashboard/parts-management/tables/manufacturers/manufacturers').then(
                (c) => c.Manufacturers,
              ),
          },
          {
            path: 'models',
            loadComponent: () =>
              import('./dashboard/parts-management/tables/models/models').then((c) => c.Models),
          },
          {
            path: 'cities',
            loadComponent: () =>
              import('./dashboard/parts-management/tables/cities/cities').then((c) => c.Cities),
          },
          {
            path: 'part-conditions',
            loadComponent: () =>
              import('./dashboard/parts-management/tables/part-conditions/part-conditions').then(
                (c) => c.PartConditions,
              ),
          },
          {
            path: 'warranties',
            loadComponent: () =>
              import('./dashboard/parts-management/tables/warranties/warranties').then(
                (c) => c.Warranties,
              ),
          },
          {
            path: 'years',
            loadComponent: () =>
              import('./dashboard/parts-management/tables/years/years').then((c) => c.Years),
          },

          // default redirect
          {
            path: '',
            redirectTo: 'categories',
            pathMatch: 'full',
          },
        ],
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

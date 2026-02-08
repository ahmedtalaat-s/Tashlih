import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth-guard';

export const routes: Routes = [
  {
    path: 'orders',
    canActivate: [authGuard],
    loadComponent: () => import('./client-orders/client-orders').then((c) => c.ClientOrders),
  },
  {
    path: 'settings',
    canActivate: [authGuard],
    loadComponent: () => import('./settings/settings').then((c) => c.Settings),
    children: [
      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full',
      },
      {
        path: 'profile',
        loadComponent: () => import('./settings/profile/profile').then((c) => c.Profile),
      },
    ],
  },
  {
    path: 'favorites',
    canActivate: [authGuard],
    loadComponent: () => import('./favorites/favorites').then((c) => c.Favorites),
  },
  {
    path: 'supplier-profile/:id',
    loadComponent: () =>
      import('./supplier-profile/supplier-profile').then((c) => c.SupplierProfile),
  },
  {
    path: 'chat',
    canActivate: [authGuard],
    loadComponent: () => import('./chat/chat').then((c) => c.Chat),
  },
  {
    path: 'search',
    loadComponent: () => import('./search-products/search-products').then((c) => c.SearchProducts),
  },
  {
    path: 'help',
    loadComponent: () => import('./static-pages/help-center/help-center').then((m) => m.HelpCenter),
  },
  {
    path: 'privacy-policy',
    loadComponent: () =>
      import('./static-pages/privacy-policy/privacy-policy').then((m) => m.PrivacyPolicy),
  },
  {
    path: 'terms-and-conditions',
    loadComponent: () =>
      import('./static-pages/terms-and-conditions/terms-and-conditions').then(
        (m) => m.TermsAndConditions,
      ),
  },
];

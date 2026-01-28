import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth-guard';

export const routes: Routes = [
  {
    path: 'orders',
    loadComponent: () => import('./client-orders/client-orders').then((c) => c.ClientOrders),
  },
  {
    path: 'settings',
    loadComponent: () => import('./settings/settings').then((c) => c.Settings),
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

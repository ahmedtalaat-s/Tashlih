import { Routes } from '@angular/router';

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
];

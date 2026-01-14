import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'orders',
    loadComponent: () => import('./client-orders/client-orders').then((c) => c.ClientOrders),
  },
];

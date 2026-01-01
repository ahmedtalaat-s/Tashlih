import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home').then((c) => c.Home),
  },
  {
    path: 'details/:id',
    loadComponent: () =>
      import('./product/product-details/product-details').then((c) => c.ProductDetails),
  },
];

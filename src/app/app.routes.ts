import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full'
  },

  {
    path: 'products',
    loadChildren: () =>
      import('./features/products/Produit.routes')
        .then(m => m.PRODUCT_ROUTES)
  },

  {
    path: 'cart',
    loadChildren: () =>
      import('./features/cart/cart.routes')
        .then(m => m.CART_ROUTES)
  },
 

  {
    path: '**',
    redirectTo: 'products'
  }
];
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'register',
    loadComponent: () => import('./signup/signup').then((m) => m.Signup),
  }
];

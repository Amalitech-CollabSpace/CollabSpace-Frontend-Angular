import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('../app/features/dashboard/dashboard.routes').then(
        (m) => m.routes
      ),
  },
];

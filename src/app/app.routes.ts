import { Routes } from '@angular/router';
import {authRoutes} from './features/auth/auth.routes'

export const routes: Routes = [
  {
    path:'',
    children:authRoutes

  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('../app/features/dashboard/dashboard.routes').then(
        (m) => m.routes
      ),
  },
];

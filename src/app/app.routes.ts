import { Routes } from '@angular/router';
import { authRoutes } from './features/auth/auth.routes';

export const routes: Routes = [
  // Default route - redirect to dashboard
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },

  // Auth routes (from dev)
  {
    path: '',
    children: authRoutes
  },

  // Lazy load dashboard module
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./features/dashboard/dashboard.routes').then(
        (m) => m.routes
      ),
  },

  // Lazy load projects module
  {
    path: 'projects',
    loadChildren: () =>
      import('./projects/projects.routes').then(
        (m) => m.routes
      ),
  },

  // Wildcard route - must be last
  {
    path: '**',
    redirectTo: '/dashboard'
  }
];
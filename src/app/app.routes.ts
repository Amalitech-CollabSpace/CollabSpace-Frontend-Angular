import { Routes } from '@angular/router';

export const routes: Routes = [
  // Default route - redirect to dashboard
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },

  // Auth routes (from dev)
  {
    path: 'auth',
    children: [
      {
        path: 'register',
        loadComponent: () => import('./features/auth/signup/signup').then(m => m.Signup)
      }
    ]
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
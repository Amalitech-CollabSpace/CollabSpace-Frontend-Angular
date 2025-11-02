import { Routes } from '@angular/router';
import { authRoutes } from './features/auth/auth.routes';
import { authGuard } from './core/guards/auth-guard';
export const routes: Routes = [
  {
    path: '',
    children: authRoutes,
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('../app/features/dashboard/dashboard.routes').then(
        (m) => m.routes
      ),
    canActivate: [authGuard],
  },
  {
    path: 'comment',
    loadComponent: () =>
      import(
        '../app/features/task-comment/comment-section/comments/comments'
      ).then((m) => m.Comments),
  },
];

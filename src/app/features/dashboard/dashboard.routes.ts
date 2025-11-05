import { Routes } from '@angular/router';
import { Dashboard } from './dashboard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: '',
    component: Dashboard,
    children: [
      {
        path: 'home',
        loadComponent: () => import('./home/home').then((m) => m.Home),
      },
      {
        path: 'profile',
        loadComponent: () => import('./profile/profile').then((m) => m.Profile),
      },
      {
        path: 'chat',
        loadComponent: () => import('./chat/chat').then((m) => m.Chat),
      },
      {
        path: 'projects',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./projects/projects').then((m) => m.Projects),
          },
          {
            path: ':id',
            loadComponent: () =>
              import('./projects/project-details/project-details').then(
                (m) => m.ProjectDetails
              ),
          },
          {
            path: 'task/create',
            loadComponent: () =>
              import('./projects/tasks/tasks').then((m) => m.Tasks),
          },
          {
            path: 'task/edit/:id',
            loadComponent: () =>
              import('./projects/tasks/tasks').then((m) => m.Tasks),
          },
          {
            path: 'task/:id',
            loadComponent: () =>
              import('./projects/tasks/task-details/task-details').then((m) => m.TaskDetails),
          },
        ],
      },
      {
        path: 'analytics',
        loadComponent: () =>
          import('./analytics/analytics').then((m) => m.Analytics),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./settings/settings').then((m) => m.Settings),
      },
    ],
  },
];

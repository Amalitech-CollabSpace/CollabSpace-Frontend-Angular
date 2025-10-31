import { Routes } from '@angular/router';
import { Dashboard } from './dashboard';
import { ProjectListComponent } from './projects/components/project-list/project-list.component';
import { ProjectFormComponent } from './projects/components/project-form/project-form.component';
import { ProjectDetailComponent } from './projects/components/project-detail/project-detail.component';

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
        component: ProjectListComponent
      },
      {
        path: 'projects/create',
        component: ProjectFormComponent
      },
      {
        path: 'projects/edit/:id',
        component: ProjectFormComponent
      },
      {
        path: 'projects/:id',
        component: ProjectDetailComponent
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

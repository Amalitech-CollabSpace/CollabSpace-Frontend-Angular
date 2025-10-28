import { Routes } from '@angular/router';
import { projectRoutes } from './project-management/project.routes';

export const routes: Routes = [
  { path: '', redirectTo: '/projects', pathMatch: 'full' },
  ...projectRoutes,
  { path: '**', redirectTo: '/projects' }
];

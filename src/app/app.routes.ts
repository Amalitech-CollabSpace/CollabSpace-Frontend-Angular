import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'projects',
    loadChildren: () => import('./features/projects/projects.module').then(m => m.ProjectsModule)
  }
];

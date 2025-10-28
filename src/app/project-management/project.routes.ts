import { Routes } from '@angular/router';
import { ProjectListComponent } from './components/project-list/project-list';
import { ProjectFormComponent } from './components/project-form/project-form';
import { ProjectDetailsComponent } from './components/project-details/project-details';

export const projectRoutes: Routes = [
  {
    path: 'projects',
    children: [
      {
        path: '',
        component: ProjectListComponent
      },
      {
        path: 'new',
        component: ProjectFormComponent
      },
      {
        path: ':id',
        component: ProjectDetailsComponent
      },
      {
        path: ':id/edit',
        component: ProjectFormComponent
      }
    ]
  }
];

// For dashboard integration later, these routes will be:
// /dashboard/projects -> ProjectListComponent
// /dashboard/projects/new -> ProjectFormComponent  
// /dashboard/projects/:id -> ProjectDetailsComponent
// /dashboard/projects/:id/edit -> ProjectFormComponent

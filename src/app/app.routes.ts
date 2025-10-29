import { Routes } from '@angular/router';
import { ProjectListComponent } from './projects/components/project-list/project-list.component';
import { ProjectFormComponent } from './projects/components/project-form/project-form.component';
import { ProjectDetailComponent } from './projects/components/project-detail/project-detail.component';

export const routes: Routes = [
  // Project Management routes
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
    path: 'dashboard',
    loadChildren: () =>
      import('../app/features/dashboard/dashboard.routes').then(
        (m) => m.routes
      ),
  },
];

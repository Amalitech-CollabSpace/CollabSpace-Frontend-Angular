import { Routes } from '@angular/router';
import { authRoutes } from './features/auth/auth.routes';
import { ProjectListComponent } from './projects/components/project-list/project-list.component';
import { ProjectFormComponent } from './projects/components/project-form/project-form.component';
import { ProjectDetailComponent } from './projects/components/project-detail/project-detail.component';

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

  // Dashboard route (from dev)
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./features/dashboard/dashboard.routes').then(
        (m) => m.routes
      ),
  },

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

  // Wildcard route - must be last
  {
    path: '**',
    redirectTo: '/dashboard'
  }
];
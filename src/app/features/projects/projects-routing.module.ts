import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { ProjectFormComponent } from './components/project-form/project-form.component';
import { ProjectDetailComponent } from './components/project-detail/project-detail.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectListComponent
  },
  {
    path: 'create',
    component: ProjectFormComponent
  },
  {
    path: 'edit/:id',
    component: ProjectFormComponent
  },
  {
    path: ':id',
    component: ProjectDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }

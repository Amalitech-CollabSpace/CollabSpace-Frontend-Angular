import { Component } from '@angular/core';
import { ProjectListComponent } from "../../../components/projects/project-list/project-list.component";
@Component({
  selector: 'app-projects',
  imports: [ProjectListComponent],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {

}

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../../models/project.model';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss'
})
export class ProjectCardComponent {
  @Input() project!: Project;
  @Output() edit = new EventEmitter<Project>();
  @Output() delete = new EventEmitter<string>();

  onEdit() {
    this.edit.emit(this.project);
  }

  onDelete() {
    this.delete.emit(this.project.id);
  }
}

import { Component, Input } from '@angular/core';
import { bootstrapAlarm, bootstrapCheck2Circle } from '@ng-icons/bootstrap-icons';
import { provideIcons, NgIcon } from '@ng-icons/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-project-card',
  imports: [NgIcon, RouterLink],
  templateUrl: './project-card.html',
  styleUrl: './project-card.scss',
  
  viewProviders: [provideIcons({ bootstrapCheck2Circle,bootstrapAlarm })],
})
export class ProjectCard {
  @Input() title = 'Untitled Project';
  @Input() company = '';
  @Input() progress = 0;
  @Input() tasksLeft = 0;
  @Input() overdue = 0;
  @Input() dueIn = '';
  @Input() members: string[] = [];
  @Input() link = '#';
  pi = Math.PI

  get progressOffset(): number {
    const circumference = 2 * this.pi * 18; 
    return circumference - (this.progress / 100) * circumference;
  }
}

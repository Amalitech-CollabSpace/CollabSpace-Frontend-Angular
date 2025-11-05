import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { bootstrapAlarm, bootstrapCheck2Circle } from '@ng-icons/bootstrap-icons';
import { provideIcons, NgIcon } from '@ng-icons/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-project-card',
  imports: [NgIcon, RouterLink],
  templateUrl: './project-card.html',
  styleUrl: './project-card.scss',
  viewProviders: [provideIcons({ bootstrapCheck2Circle,bootstrapAlarm })],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectCard {
  title = input<string>('Untitled Project');
  company = input<string>('');
  progress = input<number>(0);
  tasksLeft = input<number>(0);
  overdue = input<number>(0);
  dueIn = input<string>('');
  members = input<string[]>([]);
  link = input<string>('#');
  pi = Math.PI

  get progressOffset(): number { 
   
    const circumference = 2 * this.pi * 18; 
    return circumference - (this.progress() / 100) * circumference;
  }
}

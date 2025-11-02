import { Component } from '@angular/core';
import { TaskComment } from '../task-comment';
import { DisplayComments } from '../task-show-comments/display-comments/display-comments';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  bootstrapPersonCircle,
  bootstrapPencilSquare,
} from '@ng-icons/bootstrap-icons';

@Component({
  selector: 'app-show-task',
  imports: [TaskComment, DisplayComments, NgIcon],
  viewProviders: [
    provideIcons({
      bootstrapPersonCircle,
      bootstrapPencilSquare,
    }),
  ],
  templateUrl: './show-task.html',
  styleUrl: './show-task.scss',
})
export class ShowTask {}

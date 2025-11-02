import { Component, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  bootstrapPersonCircle,
  bootstrapReply,
  bootstrapPencilSquare,
} from '@ng-icons/bootstrap-icons';
import { TaskComment } from '../../task-comment';

@Component({
  selector: 'app-display-comments',
  imports: [NgIcon, TaskComment],
  viewProviders: [
    provideIcons({
      bootstrapPersonCircle,
      bootstrapReply,
      bootstrapPencilSquare,
    }),
  ],
  templateUrl: './display-comments.html',
  styleUrl: './display-comments.scss',
})
export class DisplayComments {
  public reply = signal(false);
}

import { Component } from '@angular/core';
import { TaskComment } from '../../task-comment';
import { DisplayComments } from '../../task-show-comments/display-comments/display-comments';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  bootstrapPersonCircle,
  bootstrapReply,
  bootstrapPencilSquare,
} from '@ng-icons/bootstrap-icons';

@Component({
  selector: 'app-comments',
  imports: [TaskComment, DisplayComments, NgIcon],
  templateUrl: './comments.html',
  styleUrl: './comments.scss',
})
export class Comments {}

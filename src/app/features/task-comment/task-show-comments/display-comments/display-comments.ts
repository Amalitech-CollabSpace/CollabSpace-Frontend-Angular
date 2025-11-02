import { Component, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  bootstrapPersonCircle,
  bootstrapPencilSquare,
} from '@ng-icons/bootstrap-icons';

@Component({
  selector: 'app-display-comments',
  imports: [NgIcon],
  viewProviders: [
    provideIcons({
      bootstrapPersonCircle,
      bootstrapPencilSquare,
    }),
  ],
  templateUrl: './display-comments.html',
  styleUrl: './display-comments.scss',
})
export class DisplayComments {}

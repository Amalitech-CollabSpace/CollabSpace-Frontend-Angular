import { Component, signal, input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  bootstrapPersonCircle,
  bootstrapPencilSquare,
} from '@ng-icons/bootstrap-icons';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-display-comments',
  imports: [NgIcon, DatePipe],
  viewProviders: [
    provideIcons({
      bootstrapPersonCircle,
      bootstrapPencilSquare,
    }),
  ],
  templateUrl: './display-comments.html',
  styleUrl: './display-comments.scss',
})
export class DisplayComments {
  public comment = input<string>('');
  public date = input<Date | undefined>(undefined);
  public fullName = input<string>('');
}

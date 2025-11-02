import { Component } from '@angular/core';
import { TaskComment } from '../task-comment';
import { DisplayComments } from '../task-show-comments/display-comments/display-comments';

@Component({
  selector: 'app-show-task',
  imports: [TaskComment, DisplayComments],
  templateUrl: './show-task.html',
  styleUrl: './show-task.scss',
})
export class ShowTask {
  public dummyComments = [
    {
      name: 'Fynn Addo',
      comment: 'Hello there, mum',
    },
    {
      name: 'Noah Aqua',
      comment: 'Good job Michael',
    },
    {
      name: 'Angus Brown',
      comment: 'This is totally not acceptable or company policy',
    },
    {
      name: 'Mr Crabs',
      comment: 'Aye ayeeee',
    },
    {
      name: 'Michael Jackson Down',
      comment: 'Yee-hooo',
    },
  ];
}

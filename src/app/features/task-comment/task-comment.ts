import { Component, inject, OnInit, signal } from '@angular/core';
import { SocketService } from '../../core/services/socketService/socket-service';
import { FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapPersonCircle } from '@ng-icons/bootstrap-icons';
import { DisplayComments } from './task-show-comments/display-comments/display-comments';
@Component({
  selector: 'app-task-comment',
  imports: [FormsModule, NgIcon, DisplayComments],
  templateUrl: './task-comment.html',
  viewProviders: [provideIcons({ bootstrapPersonCircle })],
  styleUrl: './task-comment.scss',
})
export class TaskComment implements OnInit {
  public rows = signal(2);
  public columns = signal(30);
  public showButtons = signal(false);
  public comment = '';
  public comments: string[] = [];
  private readonly socketService = inject(SocketService);

  ngOnInit(): void {
    this.socketService.onComment((cmt: string) => {
      this.comments.push(cmt);
    });
  }

  sendComment(): void {
    if (this.comment.trim()) {
      this.socketService.sendComment(this.comment);
      this.comment = '';
      console.log('message sent');
    }
  }
  public changeDimensions(row: number, col: number) {
    this.showButtons.set(!this.showButtons());
    this.rows.set(row);
    this.columns.set(col);
  }
}

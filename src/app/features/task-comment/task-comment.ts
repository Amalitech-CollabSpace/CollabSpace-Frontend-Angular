import {
  Component,
  inject,
  OnInit,
  signal,
  Input,
  Output,
  EventEmitter,
  input,
  computed,
  model,
  output,
} from '@angular/core';
import { SocketService } from '../../core/services/socketService/socket-service';
import { FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapPersonCircle } from '@ng-icons/bootstrap-icons';
@Component({
  selector: 'app-task-comment',
  imports: [FormsModule, NgIcon],
  templateUrl: './task-comment.html',
  viewProviders: [provideIcons({ bootstrapPersonCircle })],
  styleUrl: './task-comment.scss',
})
export class TaskComment {
  public rows = signal(2);
  public columns = signal(80);
  public showButtons = signal(false);
  public comment = model('');
  public commentEvent = output<any>();
  public comments: string[] = [];

  public sendCommentToParent(): void {
    this.commentEvent.emit(this.comment());
  }

  public changeDimensions(row: number, col: number) {
    this.showButtons.set(!this.showButtons());
    this.rows.set(row);
    this.columns.set(col);
  }

  public showComment(row: number, col: number): void {
    if (!(this.comment() === '')) {
      this.sendCommentToParent();
      this.comment.set('');
    }

    this.changeDimensions(row, col);
  }
}

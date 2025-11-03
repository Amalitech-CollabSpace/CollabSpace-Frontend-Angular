import {
  Component,
  inject,
  OnInit,
  signal,
  Input,
  Output,
  EventEmitter,
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
export class TaskComment implements OnInit {
  public rows = signal(2);
  public columns = signal(30);
  public showButtons = signal(false);
  @Input() public comment = '';
  @Output() public commentEvent = new EventEmitter<string>();
  public comments: string[] = [];
  private readonly socketService = inject(SocketService);

  ngOnInit(): void {
    // this.socketService.onComment((cmt: string) => {
    //   this.comments.push(cmt);
    // });
  }

  public sendCommentToParent(): void {
    this.commentEvent.emit(this.comment);
  }

  public sendComment(): void {
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
    this.sendCommentToParent();
  }
}

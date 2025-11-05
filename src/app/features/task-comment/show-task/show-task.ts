import { Component, inject, OnDestroy } from '@angular/core';
import { TaskComment } from '../task-comment';
import { DisplayComments } from '../task-show-comments/display-comments/display-comments';
import { SocketService } from '../../../core/services/socketService/socket-service';
import { Comment } from '../../../models/comments-model/comments.model';
import { Socket } from 'socket.io-client';
import { Subject, takeUntil } from 'rxjs';
import { toast, NgxSonnerToaster } from 'ngx-sonner';
import { AuthServices } from '../../../core/services/authService/auth-service';

@Component({
  selector: 'app-show-task',
  imports: [TaskComment, DisplayComments, NgxSonnerToaster],
  templateUrl: './show-task.html',
  styleUrl: './show-task.scss',
})
export class ShowTask {
  public receivedComment: string = '';
  public taskId: string = '';
  public commentContent!: string;
  public authorId!: string;
  public name!: string;
  public comments!: Comment[];
  private readonly socketService = inject(SocketService);
  private readonly authService = inject(AuthServices);
  private readonly _destroy$ = new Subject<void>();

  public ConnectToSocket() {
    if (!this.taskId) return;

    this.socketService.connect();
    this.socketService.joinRoom(this.taskId);
    this.socketService.getAllComments(this.taskId).subscribe({
      next: (allComments) => {
        this.comments = allComments;
        takeUntil(this._destroy$);
      },
      error: (err) => {
        toast.error(err?.error?.error || err?.message || 'Unknown error');
      },
    });

    this.socketService.onNewComment().subscribe({
      next: (newComment) => {
        if (newComment.taskId == this.taskId) {
          this.comments.push(newComment);
        }
        takeUntil(this._destroy$);
      },
      error: (err) => {
        toast.error(err?.error?.error || err?.message || 'Unknown error');
      },
    });
  }

  public postComment() {
    if (!this.commentContent || this.authorId || this.taskId) return;

    const comment: Comment = {
      taskId: this.taskId,
      authorId: this.authorId,
      content: this.commentContent,
      name: this.name,
    };

    this.socketService.sendComment(comment).subscribe({
      next: () => takeUntil(this._destroy$),
      error: (err) => {
        toast.error(err?.error?.error || err?.message || 'Unknown error');
      },
    });

    this.commentContent = '';
  }

  public leaveRoom() {
    this.socketService.leaveRoom(this.taskId);
    this.comments = [];
    this.taskId = '';
  }
  ngOnDestroy() {
    this.socketService.disconnect();
    this._destroy$.unsubscribe();
  }
  public handleCommentFromChild(comment: string) {
    this.postComment();
    //   this.receivedComment = comment;
    //   this.dummyComments.push({
    //     name: 'new person',
    //     comment: comment,
    //   });
    // }

    // public dummyComments = [
    //   {
    //     name: 'Fynn Addo',
    //     comment: 'Hello there, mum',
    //   },
    //   {
    //     name: 'Noah Aqua',
    //     comment: 'Good job Michael',
    //   },
    //   {
    //     name: 'Angus Brown',
    //     comment: 'This is totally not acceptable or company policy',
    //   },
    //   {
    //     name: 'Mr Crabs',
    //     comment: 'Aye ayeeee',
    //   },
    //   {
    //     name: 'Michael Jackson Down',
    //     comment: 'Yee-hooo',
    //   },
    // ];
  }
}

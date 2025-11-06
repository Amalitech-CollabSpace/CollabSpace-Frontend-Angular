import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { TaskComment } from '../task-comment';
import { DisplayComments } from '../task-show-comments/display-comments/display-comments';
import { SocketService } from '../../../core/services/socketService/socket-service';
import { Comment } from '../../../models/comments-model/comments.model';

import { Subject, takeUntil } from 'rxjs';
import { toast } from 'ngx-sonner';
import { AuthServices } from '../../../core/services/authService/auth-service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-show-task',
  imports: [TaskComment, DisplayComments, MatProgressSpinnerModule],
  templateUrl: './show-task.html',
  styleUrl: './show-task.scss',
})
export class ShowTask implements OnInit, OnDestroy {
  public taskId: string = '678jkkiur';
  public comments: Comment[] = [];
  private readonly socketService = inject(SocketService);
  private readonly authService = inject(AuthServices);
  private readonly _destroy$ = new Subject<void>();

  public isLoading = signal(false);
  public isLoadingComment = signal(false);
  public isHidden = signal(true);
  public changeIsHidden() {
    this.isHidden.set(false);
  }
  public ConnectToSocket() {
    this.isLoading.set(true);
    if (!this.taskId) return;

    this.socketService.connect();
    try {
      this.socketService.joinRoom(this.taskId);
    } catch (err) {}
    this.socketService.getAllComments(this.taskId).subscribe({
      next: (allComments: any) => {
        this.comments = allComments!.comments;
        takeUntil(this._destroy$);
        this.isLoading.set(false);
      },
      error: (err) => {
        toast.error(
          err?.error?.error ||
            err?.error.message ||
            'Could not load all comments'
        );
        this.isLoading.set(false);
      },
    });
    try {
      this.socketService.onNewComment((newComment) => {
        this.isLoadingComment.set(false);
        this.comments.push(newComment.message);
        toast.success('New comment added');
      });
    } catch (err) {
      this.isLoadingComment.set(false);
      toast.error('Could not load new comment');
    }
  }

  ngOnInit(): void {
    this.ConnectToSocket();
  }

  public postComment(comm: string) {
    this.isLoadingComment.set(true);

    const comment: Comment = {
      taskId: this.taskId,
      authorId: this.authService.getUserDetails().id,
      content: comm,
      authorName: this.authService.getUserDetails().fullName,
      createdAt: new Date(),
    };

    this.socketService.sendComment(comment, this.taskId).subscribe({
      next: (res) => {
        this.isLoadingComment.set(false);
        takeUntil(this._destroy$);
        toast.success('Message created successfully');
        console.log('NEW COMMENT CREATED ', res);
      },
      error: (err) => {
        toast.error(
          err?.error?.error ||
            err?.error.message ||
            'Could not create comment, try again!'
        );
        console.log('COULD NOT CREATE NEW COMMENT', err);

        this.isLoadingComment.set(false);
      },
    });
  }

  public leaveRoom() {
    this.socketService.leaveRoom(this.taskId);
    this.comments = [];
    this.taskId = '';
  }
  ngOnDestroy() {
    this.socketService.disconnect();
    this._destroy$.unsubscribe();
    this.socketService.offComment();
  }
  public handleCommentFromChild(comment: string) {
    this.postComment(comment);
  }
}

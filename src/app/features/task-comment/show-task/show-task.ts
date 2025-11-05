import {
  Component,
  inject,
  OnDestroy,
  OnInit,
  NgZone,
  ChangeDetectorRef,
  signal,
} from '@angular/core';
import { TaskComment } from '../task-comment';
import { DisplayComments } from '../task-show-comments/display-comments/display-comments';
import { SocketService } from '../../../core/services/socketService/socket-service';
import { Comment } from '../../../models/comments-model/comments.model';

import { Subject, takeUntil } from 'rxjs';
import { toast, NgxSonnerToaster } from 'ngx-sonner';
import { AuthServices } from '../../../core/services/authService/auth-service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-show-task',
  imports: [
    TaskComment,
    DisplayComments,
    NgxSonnerToaster,
    MatProgressSpinnerModule,
  ],
  templateUrl: './show-task.html',
  styleUrl: './show-task.scss',
})
export class ShowTask implements OnInit, OnDestroy {
  // public receivedComment: string = '';
  public taskId: string = '678jkkiur';
  public authorId: string = 'uiopkjhgfcvb';
  public name: string = 'WSERGTHJ';
  public comments: Comment[] = [];
  private readonly socketService = inject(SocketService);
  private readonly authService = inject(AuthServices);
  private readonly _destroy$ = new Subject<void>();
  public ngZone = inject(NgZone);

  public isLoading = signal(false);

  public ConnectToSocket() {
    this.isLoading.set(true);
    console.log('WORKING?');
    if (!this.taskId) return;

    this.socketService.connect();
    try {
      console.log('TRYING TO JOIN');
      this.socketService.joinRoom(this.taskId);
    } catch (err) {
      console.log('ERROR WITH JOINING', err);
    }
    this.socketService.getAllComments(this.taskId).subscribe({
      next: (allComments: any) => {
        this.comments = allComments!.comments;
        console.log('ALL COMMENTS', allComments);
        takeUntil(this._destroy$);
        this.isLoading.set(false);
      },
      error: (err) => {
        toast.error(err?.error?.error || err?.error.message || 'Unknown error');
        this.isLoading.set(false);
      },
    });
    try {
      this.socketService.onNewComment((newComment) => {
        console.log('SUCCESSFUL COMMENT? IN ONINIT?', newComment);
        this.comments.push(newComment.message);
        this.isLoading.set(false);
      });
    } catch (err) {
      console.log('NEW COMMENT ERROR ', err);
      this.isLoading.set(false);
    }

    // this.socketService.onNewComment().subscribe({
    //   next: (newComment) => {
    //     if (newComment.taskId == this.taskId) {
    //       this.comments.push(newComment);
    //     }
    //     takeUntil(this._destroy$);
    //   },
    //   error: (err) => {
    //     toast.error(err?.error?.error || err?.message || 'Unknown error');
    //   },
    // });
  }

  ngOnInit(): void {
    this.ConnectToSocket();
  }

  public postComment(comm: string) {
    this.isLoading.set(true);
    // if (!this.commentContent || this.authorId || this.taskId) return;

    const comment: Comment = {
      taskId: this.taskId,
      authorId: this.authService.getUserDetails().id,
      content: comm,
      authorName: this.authService.getUserDetails().fullName,
    };
    console.log('Commentttttt', comment);

    this.socketService.sendComment(comment, this.taskId).subscribe({
      next: (res) => {
        console.log('Worked', res);
        // this.comments.push(res);
        this.isLoading.set(false);
        takeUntil(this._destroy$);
      },
      error: (err) => {
        toast.error(err?.error?.error || err?.error.message || 'Unknown error');
        console.log("Didn't Work", err);
        this.isLoading.set(false);
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

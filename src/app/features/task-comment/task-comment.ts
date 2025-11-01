import { Component, inject, OnInit } from '@angular/core';
import { SocketService } from '../../core/services/socketService/socket-service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-task-comment',
  imports: [FormsModule],
  templateUrl: './task-comment.html',
  styleUrl: './task-comment.scss',
})
export class TaskComment implements OnInit {
  comment = '';
  comments: string[] = [];
  socketService = inject(SocketService);

  ngOnInit(): void {
    this.socketService.onComment((cmt: string) => {
      this.comments.push(cmt);
    });
  }

  sendComment(): void {
    if (this.comment.trim()) {
      this.socketService.sendComment(this.comment);
      this.comment = '';
    }
  }
}

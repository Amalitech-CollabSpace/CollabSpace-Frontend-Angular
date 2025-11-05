import { Injectable, inject } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Comment } from '../../../models/comments-model/comments.model';
import { HttpClient } from '@angular/common/http';
import { AuthServices } from '../authService/auth-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket!: Socket;
  private socketUrl = '';
  private readonly httpSocket = inject(HttpClient);
  private readonly authService = inject(AuthServices);
  public connect() {
    if (!this.authService.isLoggedOut) {
      const token = localStorage.getItem('user_token') || '';
      this.socket = io(this.socketUrl, { auth: { accessToken: token } });
    }
  }

  public disconnect() {
    this.socket?.disconnect();
  }

  public joinRoom(taskId: string) {
    this.socket?.emit('JoinRoom', { room: taskId });
  }

  public leaveRoom(taskId: string) {
    this.socket?.emit('LeaveRoom', { room: taskId });
  }

  public sendComment(comment: Comment): Observable<Comment> {
    return this.httpSocket.post<Comment>(`${this.socketUrl}/comments`, comment);
  }

  public getAllComments(taskId: string): Observable<Comment[]> {
    return this.httpSocket.get<Comment[]>(
      `${this.socketUrl}/comments/${taskId}`
    );
  }

  public onNewComment(): Observable<Comment> {
    return new Observable<Comment>((observer) => {
      this.socket?.on('comment', (c: Comment) => observer.next(c));
      return () => this.socket?.off('comment');
    });
  }
}

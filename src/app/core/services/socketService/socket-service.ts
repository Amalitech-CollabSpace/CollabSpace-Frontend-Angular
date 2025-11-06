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
  private readonly socketUrl = import.meta.env.NG_APP_API_GATEWAY;

  private readonly httpSocket = inject(HttpClient);
  private readonly authService = inject(AuthServices);
  public connect() {
    const token = localStorage.getItem('user_token')!;

    this.socket = io(this.socketUrl, {
      path: '/socket.io',
      transports: ['websocket', 'polling'],
    });
    this.socket.on('connect', () => {});

    this.socket.on('connect_error', (error: any) => {});
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

  public sendComment(comment: Comment, taskId: string): Observable<Comment> {
    return this.httpSocket.post<Comment>(
      `${this.socketUrl}/comments/${taskId}`,
      comment
    );
  }

  public getAllComments(taskId: string) {
    return this.httpSocket.get(`${this.socketUrl}/comments/${taskId}`);
  }

  public onNewComment(callback: (comment: any) => void) {
    if (!this.socket) return;
    this.socket?.on('commentAdded', callback);
  }

  public offComment() {
    this.socket?.off('commentAdded');
  }
}

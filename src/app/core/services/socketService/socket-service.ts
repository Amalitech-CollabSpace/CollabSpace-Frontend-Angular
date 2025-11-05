import { Injectable, inject } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Comment } from '../../../models/comments-model/comments.model';
import { HttpClient } from '@angular/common/http';
import { AuthServices } from '../authService/auth-service';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket!: Socket;
  private socketUrl = environment.socketUrl;
  private readonly httpSocket = inject(HttpClient);
  private readonly authService = inject(AuthServices);
  public connect() {
    // if (!this.authService.isLoggedOut) {
    const token = localStorage.getItem('user_token') || '';
    const accesstoken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjgzZWFlNGZmLWU0MTUtNGY2My05ZWQ0LWIwNTc0NTFhMzQzNiIsInJvbGUiOiJNRU1CRVIiLCJpYXQiOjE3NjIzNTIzNzIsImV4cCI6MTc2MjM1NTk3Mn0.RlQ-hl54blgrBQt4w4EZK9unNNr9yteCJXFCCIjHe30';
    this.socket = io(this.socketUrl);
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

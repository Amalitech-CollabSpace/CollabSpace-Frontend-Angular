import { Injectable, OnInit } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class SocketService implements OnInit {
  private socket!: Socket;

  ngOnInit(): void {
    this.socket = io('');
  }

  sendComment(comment: string): void {
    this.socket.emit('comment', comment);
  }

  onComment(callback: (comment: string) => void): void {
    this.socket.on('comment', callback);
  }
}

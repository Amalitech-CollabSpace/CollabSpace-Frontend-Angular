import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Message } from '../../../models/chat';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private baseUrl = import.meta.env.NG_APP_API_GATEWAY;
  private socket!: Socket;
  constructor() {
    this.socket = io(this.baseUrl); 
  }


  sendMessage(message: Message): void {
    this.socket.emit('message', message);
  }


  onMessage(callback: (message: Message) => void): void {
    this.socket.on('message', callback);
  }
}

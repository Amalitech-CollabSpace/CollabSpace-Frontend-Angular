import { CommonModule, NgClass } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../../core/services/socket/chat-service';
import { Message } from '../../../models/chat';

@Component({
  selector: 'app-chat',
  imports: [NgClass, FormsModule, CommonModule],
  templateUrl: './chat.html',
  styleUrl: './chat.scss',
})
export class Chat implements OnInit {
  chatService = inject(ChatService);
  messages = signal<Message[]>([
    {
      id: 4,
      user: 'Jesse',
      text: "Mainly the new analytics widgets. Here's a quick look at the component structure:",
      time: '10:08 AM',
      type: 'received',
      // code: `<widgetContainer>\n  <Chart data={analyticsData} />\n  <Summary />\n</widgetContainer>`,
    },
  ]);

  newMessage = signal('');

  ngOnInit(): void {
    this.chatService.onMessage((message: Message) => {
      this.messages().push(message);
    });
  }
  sendMessage() {
    const text = this.newMessage().trim();
    if (!text) return;
    this.messages.update((msgs) => [
      ...msgs,
      {
        id: msgs.length + 1,
        user: 'Sarah Dane',
        text,
        time: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        type: 'sent',
      },
    ]);
    const message: Message = {
      id: this.messages().length + 1,
      user: 'Ishaque',
      text,
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      type: 'sent',
    };

    this.chatService.sendMessage(message);
    this.newMessage.set('');
  }
}

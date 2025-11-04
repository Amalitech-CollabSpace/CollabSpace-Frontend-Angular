import { CommonModule, NgClass } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Message {
  id: number;
  user: string;
  text: string;
  time: string;
  type: 'sent' | 'received';
  code?: string;
}

@Component({
  selector: 'app-chat',
  imports: [NgClass, FormsModule,CommonModule],
  templateUrl: './chat.html',
  styleUrl: './chat.scss',
})
export class Chat {
  messages = signal<Message[]>([
    {
      id: 1,
      user: 'Alex Chen',
      text: "Hey team, the latest designs for the main dashboard are ready for review. I’ve uploaded them to the shared folder.",
      time: '10:00 AM',
      type: 'received',
    },
    {
      id: 2,
      user: 'Maria Garcia',
      text: "Great, I’ll take a look now. Is there a specific section you want feedback on first?",
      time: '10:02 AM',
      type: 'received',
    },
    {
      id: 3,
      user: 'Sarah Dane',
      text: "Thanks, Alex! I’ll check them out after my 11 AM meeting.",
      time: '10:05 AM',
      type: 'sent',
    },
    {
      id: 4,
      user: 'Alex Chen',
      text: "Mainly the new analytics widgets. Here's a quick look at the component structure:",
      time: '10:08 AM',
      type: 'received',
      code: `<widgetContainer>\n  <Chart data={analyticsData} />\n  <Summary />\n</widgetContainer>`,
    },
  ]);

  newMessage = signal('');

  sendMessage() {
    const text = this.newMessage().trim();
    if (!text) return;
    this.messages.update((msgs) => [
      ...msgs,
      {
        id: msgs.length + 1,
        user: 'Sarah Dane',
        text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'sent',
      },
    ]);
    this.newMessage.set('');
  }
}

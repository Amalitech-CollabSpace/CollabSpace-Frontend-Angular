import { Component, signal, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Member {
  name: string;
  role: 'Manager' | 'Member';
  avatar?: string;
}

@Component({
  selector: 'app-invite-popup',
  imports: [FormsModule, CommonModule],
  templateUrl: './invite-popup.html',
  styleUrl: './invite-popup.scss',
})
export class InvitePopup {
  protected isOpen = signal<boolean>(false);

  protected members = signal<Member[]>([
    {
      name: 'Desmond Anane',
      role: 'Member',
      avatar: 'https://i.pravatar.cc/40?u=1',
    },
    {
      name: 'Isaac Antwi',
      role: 'Member',
      avatar: 'https://i.pravatar.cc/40?u=2',
    },
  ]);

  workspaceName = input('My Workspace');

  protected newInvite = signal<string>('');
  protected newRole = signal<'Manager' | 'Member'>('Member');

  protected open() {
    this.isOpen.set(true);
  }

  protected close() {
    this.isOpen.set(false);
  }

  protected invite() {
    if (!this.newInvite()) return;
    this.members.update((prev) => [
      ...prev,
      { name: this.newInvite(), role: this.newRole() },
    ]);
    this.newInvite.set('');
  }

  protected removeMember(index: number) {
    this.members.update((list) => list.filter((_, i) => i !== index));
  }
}

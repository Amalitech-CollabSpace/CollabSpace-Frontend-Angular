import { Component, signal, input, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../core/services/projectService/project-service';
import { AuthServices } from '../../core/services/authService/auth-service';
import { ActivatedRoute, Router } from '@angular/router';
import { toast } from 'ngx-sonner';

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
  private readonly route = inject(ActivatedRoute);
  private readonly projectService = inject(ProjectService);
  private readonly authService = inject(AuthServices);
  protected members = signal<string[]>([]);

  workspaceName = input('My Workspace');

  protected projectId = signal<string>(this.route.snapshot.paramMap.get('id')!);
  protected userId = signal<string>('');
  protected newInvite = signal<string>('');
  protected newRole = signal<'Manager' | 'Member'>('Member');

  toggle() {
    this.isOpen.update((open) => !open);
  }

  constructor(private readonly router: Router) {
    router.events.subscribe(() => {
      this.projectId.set(this.route.snapshot.paramMap.get('id')!);
    });

    this.userId.set(this.authService.getUserDetails().id);
  }

  protected addMember() {
    if (!this.newInvite()) return;
    this.members.update((prev) => [...prev, this.newInvite()]);
    this.newInvite.set('');
  }

  protected invite() {
    
    this.projectService.inviteMember({
      projectId: this.projectId(),
      projectName: this.workspaceName(),
      userId: this.userId(),
      inviteeEmails: this.members(),
    }).subscribe({
      next: (res) =>{
        toast.success("Successfully invited")
      },
      error: (err)=> {
        toast.error("Couldn't invite users")
      }
    })
  }

  protected removeMember(index: number) {
    this.members.update((list) => list.filter((_, i) => i !== index));
  }
}

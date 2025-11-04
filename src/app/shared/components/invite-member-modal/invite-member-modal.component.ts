import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import { Subject, takeUntil, Observable } from 'rxjs';
import { ProjectService } from '../../../core/services/projectService/project.service';
import { ProjectMemberRole } from '../../../models/project-member.model';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-invite-member-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './invite-member-modal.component.html',
  styleUrl: './invite-member-modal.component.scss',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms ease-in', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms ease-out', style({ opacity: 0 }))
      ])
    ]),
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateY(-10px)', opacity: 0 }),
        animate('200ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'translateY(-10px)', opacity: 0 }))
      ])
    ])
  ]
})
export class InviteMemberModalComponent implements OnInit, OnDestroy {
  @Input() projectId: string = '';
  @Output() memberInvited = new EventEmitter<void>();
  @Output() closeModal = new EventEmitter<void>();

  isOpen = false;
  isLoading = false;
  inviteForm!: FormGroup<{
    email: FormControl<string | null>;
    role: FormControl<ProjectMemberRole | null>;
  }>;

  roles: ProjectMemberRole[] = [
    ProjectMemberRole.OWNER,
    ProjectMemberRole.ADMIN,
    ProjectMemberRole.MEMBER,
    ProjectMemberRole.VIEWER
  ];

  private destroy$ = new Subject<void>();

  constructor(
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.inviteForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      role: new FormControl<ProjectMemberRole>(ProjectMemberRole.MEMBER, [
        Validators.required
      ])
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey(event: KeyboardEvent): void {
    if (this.isOpen) {
      this.close();
    }
  }

  open(): void {
    this.isOpen = true;
    document.body.style.overflow = 'hidden';
  }

  close(): void {
    this.isOpen = false;
    document.body.style.overflow = '';
    this.inviteForm.reset({
      email: '',
      role: ProjectMemberRole.MEMBER
    });
    this.closeModal.emit();
  }

  onBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.close();
    }
  }

  onInvite(): void {
    if (this.inviteForm.invalid || this.isLoading) {
      this.inviteForm.markAllAsTouched();
      return;
    }

    const email = this.inviteForm.controls.email.value;
    const role = this.inviteForm.controls.role.value;

    if (!email || !role || !this.projectId) {
      return;
    }

    this.isLoading = true;

    // First, lookup user by email to get userId
    this.lookupUserByEmail(email)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (userId) => {
          if (userId) {
            // Then invite the member
            this.projectService.inviteMember({
              projectId: this.projectId,
              userId: userId,
              role: role
            })
            .pipe(takeUntil(this.destroy$))
            .subscribe({
              next: () => {
                toast.success('Member invited successfully');
                this.memberInvited.emit();
                this.close();
                this.isLoading = false;
              },
              error: (err) => {
                toast.error('Failed to invite member', {
                  description: err?.error?.message || 'Please try again.'
                });
                this.isLoading = false;
              }
            });
          } else {
            toast.error('User not found', {
              description: 'No user found with this email address.'
            });
            this.isLoading = false;
          }
        },
        error: (err) => {
          toast.error('Failed to lookup user', {
            description: err?.error?.message || 'Unable to find user by email.'
          });
          this.isLoading = false;
        }
      });
  }

  private lookupUserByEmail(email: string): Observable<string> {
    // Try to get user ID from backend API
    // This is a placeholder - adjust the endpoint based on your backend API
    return this.projectService.lookupUserByEmail(email);
  }

  get emailControl() {
    return this.inviteForm.controls.email;
  }

  get roleControl() {
    return this.inviteForm.controls.role;
  }
}


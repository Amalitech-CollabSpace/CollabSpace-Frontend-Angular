import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ProjectService } from '../../core/services/projectService/project-service';
import { ProjectRequest } from '../../models/project.d';
import { InputComponent } from '../input-component/input-component';
import { ButtonComponent } from '../button/button';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    InputComponent,
    ButtonComponent,
  ],
  templateUrl: './project-form.html',
})
export class ProjectFormComponent implements OnInit, OnDestroy {
  protected projectForm!: FormGroup;
  protected isEditMode = signal(false);
  protected projectId = signal<string>('');
  protected isLoading = signal(false);
  protected error = signal<string | null>(null);
  protected isSubmitting = signal(false);
  private destroy$ = new Subject<void>();

  constructor(
    private readonly fb: FormBuilder,
    private readonly projectService: ProjectService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.projectForm = this.fb.group({
      name: ['', [Validators.required]],
      description: [''],
      start_date: ['', [Validators.required]],
      end_date: ['', [Validators.required]],
    });

    this.projectId.set(this.route.snapshot.paramMap.get('id')!);
    if (this.projectId()) {
      this.isEditMode.set(true);
      this.loadProject();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected loadProject(): void {
    if (!this.projectId()) return;

    this.isLoading.set(true);
    this.error.set(null);

    this.projectService
      .getProjectById(this.projectId())
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (project) => {
          this.projectForm.patchValue({
            name: project.name,
            description: project.description,
            start_date: this.formatDateForInput(project.startDate),
            end_date: this.formatDateForInput(project.endDate),
          });
          this.isLoading.set(false);
        },
        error: (err) => {
          this.error.set('Failed to load project. Please try again.');
          toast.error('Failed to load project', {
            description:
              err?.error?.message ||
              'An error occurred while loading the project.',
          });
          this.isLoading.set(false);
        },
      });
  }

  protected formatDateForInput(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  }

  protected onSubmit(): void {
    if (this.projectForm.invalid || this.isSubmitting()) {
      return;
    }

    this.isSubmitting.set(true);
    this.error.set(null);

    const projectData: ProjectRequest = {
      name: this.projectForm.value.name,
      description: this.projectForm.value.description || '',
      start_date: new Date(this.projectForm.value.start_date).toISOString(),
      end_date: new Date(this.projectForm.value.end_date).toISOString(),
    };


    if (this.isEditMode() && this.projectId()) {
      this.projectService
        .updateProject(this.projectId(), projectData)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.isSubmitting.set(false);
            toast.success('Project updated successfully');
            this.router.navigate(['/dashboard/projects']);
          },
          error: (err) => {
            this.error.set('Failed to update project. Please try again.');
            toast.error('Failed to update project', {
              description:
                err?.error?.message ||
                'An error occurred while updating the project.',
            });
            this.isSubmitting.set(false);
          },
        });
    } else {
      this.projectService
        .createProject(projectData)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.isSubmitting.set(false);
            toast.success('Project created successfully');
            this.router.navigate(['/dashboard/projects']);
          },
          error: (err) => {
            this.error.set('Failed to create project. Please try again.');
            toast.error('Failed to create project', {
              description:
                err?.error?.message ||
                'An error occurred while creating the project.',
            });
            this.isSubmitting.set(false);
          },
        });
    }
  }

  protected onCancel(): void {
    this.router.navigate(['/dashboard/projects']);
  }

}

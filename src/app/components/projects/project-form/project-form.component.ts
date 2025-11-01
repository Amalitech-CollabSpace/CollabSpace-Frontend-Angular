import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../../../core/services/projectService/project.service';
import { ProjectRequest } from '../../../models/project.model';
import { InputComponent } from '../../input-component/input-component';

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, InputComponent],
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.scss'
})
export class ProjectFormComponent implements OnInit {
  projectForm!: FormGroup;
  isEditMode = false;
  projectId: string | null = null;
  isLoading = false;
  error: string | null = null;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.projectForm = this.fb.group({
      name: ['', [Validators.required]],
      description: [''],
      start_date: ['', [Validators.required]],
      end_date: ['', [Validators.required]]
    });

    // Check if we're in edit mode
    this.projectId = this.route.snapshot.paramMap.get('id');
    if (this.projectId) {
      this.isEditMode = true;
      this.loadProject();
    }
  }

  loadProject(): void {
    if (!this.projectId) return;

    this.isLoading = true;
    this.error = null;

    this.projectService.getProjectById(this.projectId).subscribe({
      next: (project) => {
        this.projectForm.patchValue({
          name: project.name,
          description: project.description,
          start_date: this.formatDateForInput(project.startDate),
          end_date: this.formatDateForInput(project.endDate)
        });
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load project. Please try again.';
        console.error('Error loading project:', err);
        this.isLoading = false;
      }
    });
  }

  formatDateForInput(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  }

  onSubmit(): void {
    if (this.projectForm.invalid || this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;
    this.error = null;

    const projectData: ProjectRequest = {
      name: this.projectForm.value.name,
      description: this.projectForm.value.description || '',
      start_date: new Date(this.projectForm.value.start_date).toISOString(),
      end_date: new Date(this.projectForm.value.end_date).toISOString()
    };

    const userId = this.getUserId();

    if (this.isEditMode && this.projectId) {
      this.projectService.updateProject(this.projectId, projectData, userId).subscribe({
        next: () => {
          this.isSubmitting = false;
          this.router.navigate(['/dashboard/projects']);
        },
        error: (err) => {
          this.error = 'Failed to update project. Please try again.';
          console.error('Error updating project:', err);
          this.isSubmitting = false;
        }
      });
    } else {
      this.projectService.createProject(projectData, userId).subscribe({
        next: () => {
          this.isSubmitting = false;
          this.router.navigate(['/dashboard/projects']);
        },
        error: (err) => {
          this.error = 'Failed to create project. Please try again.';
          console.error('Error creating project:', err);
          this.isSubmitting = false;
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/dashboard/projects']);
  }

  private getUserId(): string {
    const token = localStorage.getItem('user_token');
    if (token) {
      return 'user-id-placeholder';
    }
    return 'user-id-placeholder';
  }
}


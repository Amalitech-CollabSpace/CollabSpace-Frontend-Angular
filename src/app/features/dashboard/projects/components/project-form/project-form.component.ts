import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Project } from '../../../../../models/project.model';
import { InputComponent } from '../../../../../components/input-component/input-component';

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, InputComponent],
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.scss'
})
export class ProjectFormComponent implements OnInit {
  projectForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.projectForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['']
    });
  }

  onSubmit(): void {
    if (this.projectForm.valid) {
      const project: Project = this.projectForm.value;
    }
  }
}


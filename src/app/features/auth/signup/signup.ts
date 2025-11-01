import {
  Component,
  OnInit,
  inject,
  ViewChild,
  OnDestroy,
  signal,
} from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { confirmPasswordValidator } from '../validators/confirmPassword';
import { InputComponent } from '../../../components/input-component/input-component';
import { AuthServices } from '../../../core/services/authService/auth-service';
import { Subject, takeUntil } from 'rxjs';

import { StrongPasswordValidator } from '../validators/passwordRegex';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { toast, NgxSonnerToaster } from 'ngx-sonner';

@Component({
  selector: 'app-signup',
  imports: [
    ReactiveFormsModule,
    InputComponent,
    RouterLink,
    NgxSonnerToaster,
    MatProgressSpinnerModule,
  ],
  templateUrl: './signup.html',
  // styleUrl: '',
})
export class Signup implements OnInit, OnDestroy {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthServices);
  private readonly _destroy$ = new Subject<void>();
  public isLoading = signal(false);

  signUpForm!: FormGroup<{
    fullName: FormControl<string | null>;
    email: FormControl<string | null>;
    password: FormControl<string | null>;
    confirmPassword: FormControl<string | null>;
  }>;

  ngOnInit() {
    this.signUpForm = new FormGroup(
      {
        fullName: new FormControl('', [Validators.required]),
        email: new FormControl('', [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
          StrongPasswordValidator(),
        ]),
        confirmPassword: new FormControl('', [Validators.required]),
      },
      { validators: confirmPasswordValidator }
    );
  }

  public submitSignup() {
    this.isLoading.set(true);

    if (this.signUpForm.valid) {
      const newUser = {
        fullName: this.signUpForm.controls.fullName.value || '',
        password: this.signUpForm.controls.password.value || '',
        email: this.signUpForm.controls.email.value || '',
      };
      this.authService.signup(newUser).subscribe({
        next: () => {
          this.isLoading.set(false);

          this.router.navigate(['/dashboard']);
          toast.success('Registered successfully');

          takeUntil(this._destroy$);
        },
        error: (err) => {
          this.isLoading.set(false);
          toast.error(err?.error?.error || err?.message || 'Unknown error');
        },
      });
    } else {
      this.signUpForm.markAllAsTouched();
    }
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
}

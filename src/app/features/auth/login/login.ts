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

import { InputComponent } from '../../../components/input-component/input-component';
import { AuthServices } from '../../../core/services/authService/auth-service';
import { Subject, takeUntil } from 'rxjs';

import { StrongPasswordValidator } from '../validators/passwordRegex';
import { toast, NgxSonnerToaster } from 'ngx-sonner';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    InputComponent,
    RouterLink,
    NgxSonnerToaster,
    MatProgressSpinnerModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthServices);
  private readonly _destroy$ = new Subject<void>();

  public errorMessage = '';
  protected readonly toast = toast;
  public isLoading = signal(false);

  loginForm!: FormGroup<{
    email: FormControl<string | null>;
    password: FormControl<string | null>;
  }>;

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        StrongPasswordValidator(),
      ]),
    });
  }

  public submitLogin() {
    this.isLoading.set(true);

    if (this.loginForm.valid) {
      const newUser = {
        password: this.loginForm.controls.password.value || '',
        email: this.loginForm.controls.email.value || '',
      };
      this.authService.login(newUser).subscribe({
        next: () => {
          this.isLoading.set(false);

          this.router.navigate(['/dashboard']);
          toast.success('Logged in successfully');

          takeUntil(this._destroy$);
        },
        error: (err) => {
          this.isLoading.set(false);
          toast.error(
            err?.error?.error || err?.error.message || 'Unknown error'
          );
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
}

import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule],
  templateUrl: './login.page.html',
  styleUrl: './login.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly loading = signal(false);
  protected readonly errorMessage = signal('');

  protected readonly loginForm = new FormGroup({
    userName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  protected login(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.errorMessage.set('Enter both username and password.');
      return;
    }

    this.loading.set(true);
    this.errorMessage.set('');

    const { userName, password } = this.loginForm.getRawValue();

    this.authService.loginUser(userName, password).subscribe({
      next: (response) => {
        this.authService.setToken(response.token);
        this.router.navigateByUrl('/home');
      },
      error: () => {
        this.loading.set(false);
        this.errorMessage.set('Login failed. Please check your credentials.');
      },
    });
  }
}
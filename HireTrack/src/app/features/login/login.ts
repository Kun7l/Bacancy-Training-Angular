import { Component, OnDestroy, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth-service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnDestroy {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  private subcription: Subscription | undefined = undefined;
  errorMessage = signal<string>('');

  loginForm = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  private defaultValue = {
    email: 'user@example.com',
    password: 'secret',
  };

  patchValueFn() {
    this.loginForm.patchValue(this.defaultValue);
  }

  submit() {
    this.errorMessage.set('');
    if (this.loginForm.invalid) {
      return;
    }
    const formData = this.loginForm.getRawValue();
    this.subcription = this.authService
      .login(formData.email, formData.password)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.router.navigate(['dashboard']);
        },
        error: (err) => {
          this.errorMessage.set(err.error.msg);
        },
      });
  }

  ngOnDestroy(): void {
    this.subcription?.unsubscribe();
  }
}

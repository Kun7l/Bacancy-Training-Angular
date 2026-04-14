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
import { ErrorService } from '../../core/services/error-service';
import { LoadingButton } from "../../shared/components/loaders/loading-button/loading-button";

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, LoadingButton],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnDestroy {
  constructor(
    private authService: AuthService,
    private router: Router,
    private errorService: ErrorService,
  ) {}

  private subcription: Subscription | undefined = undefined;
  protected isBeginLoggedIn = signal<boolean>(false);
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
    email: 'krunal@gmail.com',
    password: '123456',
  };

  patchValueFn() {
    this.loginForm.patchValue(this.defaultValue);
  }

  submit() {
    this.errorMessage.set('');
    this.isBeginLoggedIn.set(true);
    if (this.loginForm.invalid) {
      return;
    }
    const formData = this.loginForm.getRawValue();
    this.subcription = this.authService
      .login(formData.email, formData.password)
      .subscribe({
        next: (data) => {
          this.errorService.setSuccessMessage('Login successful!');
          this.router.navigate(['dashboard']);
           this.isBeginLoggedIn.set(false);
        },
        error: (err) => {
          this.errorMessage.set(err.error.msg);
           this.isBeginLoggedIn.set(false);
        },
      });
   
  }

  ngOnDestroy(): void {
    this.subcription?.unsubscribe();
  }
}

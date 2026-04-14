import { Component, signal, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth-service';
import { Router } from '@angular/router';
import { MessageService } from '../../core/services/messageService';
import { LoadingButton } from "../../shared/components/loaders/loading-button/loading-button";

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, LoadingButton],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService,
  ) {}

  private destroyRef = inject(DestroyRef);
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
      this.loginForm.markAllAsTouched();
      this.isBeginLoggedIn.set(false);
      return;
    }
    const formData = this.loginForm.getRawValue();
    this.authService.login(formData.email, formData.password).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: (data) => {
        this.messageService.setSuccessMessage('Login successful!');
        this.router.navigate(['dashboard']);
        this.isBeginLoggedIn.set(false);
      },
      error: (err) => {
        this.errorMessage.set(err.error.msg);
        this.isBeginLoggedIn.set(false);
      },
    });
   
  }
}

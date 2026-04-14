import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { catchError, tap } from 'rxjs';
import { MessageService } from './messageService';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) {}

  private keys = {
    accessToken: 'access_token',
    user: 'user',
  };

  login(email: string, password: string) {
    return this.http
      .post(`${environment.supabaseUrl}/auth/v1/token?grant_type=password`, {
        email,
        password,
      })
      .pipe(
        catchError((err) => {
          this.messageService.setErrorMessage(err);
          throw err;
        }),
        tap((res: any) => {
          localStorage.setItem(this.keys.accessToken, res.access_token);
          localStorage.setItem(this.keys.user, JSON.stringify(res.user));
        }),
      );
  }

  logout(): void {
    localStorage.removeItem(this.keys.accessToken);
    localStorage.removeItem(this.keys.user);
  }

  getToken() {
    return localStorage.getItem(this.keys.accessToken);
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

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
        tap((res: any) => {
          localStorage.setItem(this.keys.accessToken, res.access_token);
          localStorage.setItem(this.keys.user, res.user);
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

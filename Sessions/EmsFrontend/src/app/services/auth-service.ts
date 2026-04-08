import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

export interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:5059/api';
  private readonly tokenKey = 'ems_auth_token';

  loginUser(userName: string, password: string) {
    return this.http.post<LoginResponse>(`${this.baseUrl}/user/login`, {
      userName,
      password,
    });
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }
}

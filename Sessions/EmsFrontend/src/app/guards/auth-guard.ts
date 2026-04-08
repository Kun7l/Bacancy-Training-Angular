import { Injectable } from '@angular/core'; // Change this
import { AuthService } from '../services/auth-service';

@Injectable({
  providedIn: 'root', // Add this
})
export class AuthGuard {
  constructor(private authService: AuthService) {}

  canActivate(): boolean {
    return this.authService.getToken() !== null;
  }
}

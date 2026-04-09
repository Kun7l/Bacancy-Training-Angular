import { Injectable } from '@angular/core'; // Change this
import { AuthService } from '../services/auth-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root', // Add this
})
export class AuthGuard {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate(): boolean {
    if (this.authService.getToken() == null) {
      this.router.navigate(['login']);
    }
    return true;
  }
}

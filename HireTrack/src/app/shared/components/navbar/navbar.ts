import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth-service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  protected user = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user')!).user_metadata.full_name
    : 'User';

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}

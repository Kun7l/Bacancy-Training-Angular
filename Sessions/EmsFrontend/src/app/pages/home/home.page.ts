import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-home-page',
  imports: [RouterLink],
  templateUrl: './home.page.html',
  styleUrl: './home.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly token = signal(this.authService.getToken());

  ngOnInit() {
    if (!this.token()) {
      this.router.navigate(['login']);
    }
  }

  protected logout(): void {
    this.authService.logout();
    this.token.set(null);
    this.router.navigate(['/login']);
  }
}

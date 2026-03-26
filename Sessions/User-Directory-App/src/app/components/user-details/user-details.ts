import { Component, inject, signal } from '@angular/core';
import {
  ActivatedRoute,
  RouterOutlet,
  RouterLinkWithHref,
  Router,
} from '@angular/router';
import { User } from '../../types/user.type';
import { UserServices } from '../../services/user-services';
import { CommonModule } from '@angular/common';
import { throwIfEmpty } from 'rxjs';

@Component({
  selector: 'app-user-details',
  imports: [RouterOutlet, RouterLinkWithHref, CommonModule],
  templateUrl: './user-details.html',
  styleUrl: './user-details.css',
})
export class UserDetails {
  private readonly route = inject(ActivatedRoute);
  private readonly userService = inject(UserServices);
  private readonly router = inject(Router);

  isDark = false;
  fragment = '';

  user: User = {
    id: 0,
    name: '',
    followers: 0,
    followings: 0,
    posts: [],
  };
  userId: number = 0;
  ngOnInit() {
    this.userId = this.route.snapshot.params['id'];
    this.user = this.userService.getUserById(Number(this.userId));
    let dark = this.route.snapshot.queryParams['dark'];
    this.fragment = this.route.snapshot.fragment!;

    if (dark == '1') {
      this.isDark = true;
      console.log(this.isDark);
    }
  }
  backButton() {
    this.router.navigate(['/users']);
  }
}

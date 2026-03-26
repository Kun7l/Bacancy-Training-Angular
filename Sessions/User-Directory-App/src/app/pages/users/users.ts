import { Component, signal } from '@angular/core';
import { User } from '../../types/user.type';
import { RouterLink } from '@angular/router';
import { UserServices } from '../../services/user-services';

@Component({
  selector: 'app-users',
  imports: [RouterLink],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users {
  constructor(private userService: UserServices) {}

  userListArray: User[] = [];
  ngOnInit() {
    this.userListArray = this.userService.getAllUsers();
  }
}

import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-user',
  imports: [RouterOutlet],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User {
  
}

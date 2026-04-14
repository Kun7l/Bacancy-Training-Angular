import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './shared/components/navbar/navbar';
import { ErrorService } from './core/services/error-service';
import { Toast } from "./shared/components/toast/toast";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toast],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'HireTrack';
  constructor(private errorService: ErrorService) {}
  protected message: string | null = null;
  
}

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './shared/components/navbar/navbar';
import { MessageService } from './core/services/messageService';
import { Toast } from "./shared/components/toast/toast";
import { Footer } from "./shared/components/footer/footer";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toast, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'HireTrack';
  constructor(private messageService: MessageService) {}
  protected message: string | null = null;
  
}

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SocialMediaFeed } from "./components/social-media-feed/social-media-feed";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SocialMediaFeed],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'observables-assignment';
}

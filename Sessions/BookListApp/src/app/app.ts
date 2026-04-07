import { Component } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { ErrorToast } from './components/error-toast/error-toast';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ErrorToast, RouterLinkWithHref],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'BookListApp';
}

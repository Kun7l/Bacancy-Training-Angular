import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BookContainer } from "./pages/book-container/book-container";

@Component({
  selector: 'app-root',
  imports: [ BookContainer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = '08_book_store_application';
}

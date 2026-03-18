import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BookList } from "./components/book-list/book-list";

@Component({
  selector: 'app-root',
  imports: [BookList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = '07_book_listing_assignment';
}

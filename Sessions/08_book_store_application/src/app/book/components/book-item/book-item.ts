import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { IBookDetails } from '../../../types/book-type';

@Component({
  selector: 'app-book-item',
  imports: [],
  templateUrl: './book-item.html',
  styleUrl: './book-item.css',
})
export class BookItem {
  @Input() book: IBookDetails = {
    id: 0,
    title: '',
    author: '',
    description: '',
    price: 0,
    imgSource: '',
  };
  @Output() deleteBookEvent = new EventEmitter<number>();
  @Output() editBookEvent = new EventEmitter<IBookDetails>();

  isViewMoreClicked = signal<boolean>(false);

  viewMoreToggle() {
    this.isViewMoreClicked.set(!this.isViewMoreClicked());
  }
  deleteBook(id: number) {
    this.deleteBookEvent.emit(id);
  }
  editBook(book: IBookDetails){
    this.editBookEvent.emit(book);
  }
}

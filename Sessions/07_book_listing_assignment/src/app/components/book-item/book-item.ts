import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { IBookDetails } from '../../types/book-type';

@Component({
  selector: 'app-book-item',
  imports: [],
  templateUrl: './book-item.html',
  styleUrl: './book-item.css',
})
export class BookItem {
  @Input() bookDetails: IBookDetails = {
    title: '',
    author: '',
    description: '',
    price: 0,
  };

  @Output() notifyParentEvent = new EventEmitter<string>();

  notifyParent(bookName : string) {
    this.notifyParentEvent.emit(bookName);
  }
}

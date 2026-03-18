import { Component, Input } from '@angular/core';
import { IBookDetails } from '../../../types/book-type';
import { BookItem } from "../book-item/book-item";

@Component({
  selector: 'app-book-list',
  imports: [BookItem],
  templateUrl: './book-list.html',
  styleUrl: './book-list.css',
})
export class BookList {
  @Input() bookList : IBookDetails[] = [{
    id: 0,
    title: '',
    author: '',
    description: '',
    price: 0,
    imgSource: ''
  }];

}

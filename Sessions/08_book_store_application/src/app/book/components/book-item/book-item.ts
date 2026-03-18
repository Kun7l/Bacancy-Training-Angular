import { Component, Input } from '@angular/core';
import { IBookDetails } from '../../../types/book-type';

@Component({
  selector: 'app-book-item',
  imports: [],
  templateUrl: './book-item.html',
  styleUrl: './book-item.css',
})
export class BookItem {
  @Input() book : IBookDetails = {
    id: 0,
    title: '',
    author: '',
    description: '',
    price: 0,
    imgSource: ''
  };

  
}

import { Component, signal } from '@angular/core';
import { IBookDetails } from '../../types/book-type';
import { BookDTO } from '../../types/bookDTO';

@Component({
  selector: 'app-book-container',
  imports: [],
  templateUrl: './book-container.html',
  styleUrl: './book-container.css',
})
export class BookContainer {
  imgSource = '';
  bookList = signal<IBookDetails[]>([
    {
      id: 1,
      title: 'Get Epic Shit Done',
      author: 'Ankur Warikoo',
      description:
        'A tactical follow-up on productivity and building better habits.',
      imgSource: '',
      price: 450,
    },
    {
      id: 2,
      title: 'Make Epic Money',
      author: 'Ankur Warikoo',
      description: 'A deep dive into personal finance and wealth management.',
      price: 499,
      imgSource: '',
    },
    {
      id: 3,
      title: 'Atomic Habits',
      author: 'James Clear',
      description: 'Tiny changes that lead to remarkable long-term results.',
      price: 550,
      imgSource: '',
    },
    {
      id: 4,
      title: 'The Psychology of Money',
      author: 'Morgan Housel',
      description: 'Timeless lessons on wealth, greed, and happiness.',
      price: 350,
      imgSource: '',
    },
  ]);

  addBook(book: BookDTO) {
    const newBook: IBookDetails = {
      id: this.bookList.length,
      title: book.title,
      author: book.author,
      description: book.description,
      price: book.price,
      imgSource: this.imgSource,
    };
    this.bookList.update((bookList) => [...bookList, newBook]);
  }

  deleteBook(id: number) {
    this.bookList.update((books) => books.filter((book) => book.id !== id));
  }
}

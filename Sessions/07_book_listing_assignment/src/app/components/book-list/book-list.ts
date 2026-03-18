import { Component, signal } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BookForm } from '../book-form/book-form';
import { IBookDetails } from '../../types/book-type';
import { BookItem } from '../book-item/book-item';

@Component({
  selector: 'app-book-list',
  imports: [BookForm, BookItem],
  templateUrl: './book-list.html',
  styleUrl: './book-list.css',
})
export class BookList {
  bookList = signal<IBookDetails[]>([
    {
      title: 'Get Epic Shit Done',
      author: 'Ankur Warikoo',
      description:
        'A tactical follow-up on productivity and building better habits.',
      price: 450,
    },
    {
      title: 'Make Epic Money',
      author: 'Ankur Warikoo',
      description: 'A deep dive into personal finance and wealth management.',
      price: 499,
    },
    {
      title: 'Atomic Habits',
      author: 'James Clear',
      description: 'Tiny changes that lead to remarkable long-term results.',
      price: 550,
    },
    {
      title: 'The Psychology of Money',
      author: 'Morgan Housel',
      description: 'Timeless lessons on wealth, greed, and happiness.',
      price: 350,
    },
  ]);

  addBook(newBook: IBookDetails) {
    this.bookList.update((bs) => [...bs, newBook]);
  }

  notifyBook(bookName: string) {
    alert('notification came from : ' + bookName);
  }
}

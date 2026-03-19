import { Component, signal } from '@angular/core';
import { IBookDetails } from '../../types/book-type';
import { BookDTO } from '../../types/bookDTO';
import { BookList } from '../../book/components/book-list/book-list';
import { BookAction } from '../../book/components/book-action/book-action';
import { Toast } from '../../book/components/toast/toast';

@Component({
  selector: 'app-book-container',
  imports: [BookList, BookAction, Toast],
  templateUrl: './book-container.html',
  styleUrl: './book-container.css',
})
export class BookContainer {
  imgSource =
    'https://book2action-5d2aff0.divio-media.net/filer_public/ae/59/ae59dfcc-a2a1-4b30-bd5f-c2948a832892/do-epic-shit.png';

  tempBook = signal<IBookDetails>({
    id: 0,
    title: '',
    author: '',
    description: '',
    price: 0,
    imgSource: '',
  });

  isAddActive = signal(false);
  isEditActive = signal(false);
  isToastVisible = signal(false);
  toastMessage = signal("");

  bookList = signal<IBookDetails[]>([
    {
      id: 1,
      title: 'Get Epic Shit Done',
      author: 'Ankur Warikoo',
      description:
        'A tactical follow-up on productivity and building better habits.',
      imgSource: this.imgSource,
      price: 450,
    },
    {
      id: 2,
      title: 'Make Epic Money',
      author: 'Ankur Warikoo',
      description: 'A deep dive into personal finance and wealth management.',
      price: 499,
      imgSource: this.imgSource,
    },
    {
      id: 3,
      title: 'Atomic Habits',
      author: 'James Clear',
      description: 'Tiny changes that lead to remarkable long-term results.',
      price: 550,
      imgSource: this.imgSource,
    },
    {
      id: 4,
      title: 'The Psychology of Money',
      author: 'Morgan Housel',
      description: 'Timeless lessons on wealth, greed, and happiness.',
      price: 350,
      imgSource: this.imgSource,
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
    this.isAddActive.set(false);

    this.isToastVisible.set(true);
    this.toastMessage.set("book added");
  }

  deleteBook(id: number) {
    this.bookList.update((books) => books.filter((book) => book.id !== id));
  }

  editBook(book: IBookDetails) {
    this.tempBook.set(book);
    this.isAddActive.set(false);
    this.isEditActive.set(true);
  }

  editBookFunction(editedBook: IBookDetails) {
    this.bookList.update((books) =>
      books.map((book) =>
        book.id === editedBook.id ? { ...book, ...editedBook } : book,
      ),
    );
    this.isEditActive.set(false);
  }
}

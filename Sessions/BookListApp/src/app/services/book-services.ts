import { Injectable } from '@angular/core';
import { BookDetailsDTO } from '../types/bookdto.type';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BookDetails } from '../types/book.type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookServices {
  constructor(private http: HttpClient) {}

  baseUrl: string =
    'https://fir-basics-5c5ec-default-rtdb.asia-southeast1.firebasedatabase.app/';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }),
  };

  addBook(book: BookDetailsDTO) {
    return this.http.post<BookDetailsDTO>(
      `${this.baseUrl}books.json`,
      book,
      this.httpOptions,
    );
  }

  getAllBooks(): Observable<Record<string, BookDetailsDTO> | null> {
    return this.http.get<Record<string, BookDetailsDTO> | null>(
      `${this.baseUrl}books.json`,
      {
        ...this.httpOptions,
      },
    );
  }

  searchBooks(): Observable<Record<string, BookDetailsDTO> | null> {
    return this.getAllBooks();
  }
}

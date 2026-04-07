import { Component, signal } from '@angular/core';
import { BookServices } from '../../services/book-services';
import { BookDetailsDTO } from '../../types/bookdto.type';
import { BookItem } from '../book-item/book-item';
import { ActivatedRoute } from '@angular/router';
import { ErrorService } from '../../services/error-service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { rangeValidator } from '../../validators/rangeValidator';

@Component({
  selector: 'app-book-list',
  imports: [
    BookItem,
    ReactiveFormsModule,
  ],
  templateUrl: './book-list.html',
  styleUrl: './book-list.css',
})
export class BookList {
  books = signal<BookDetailsDTO[] | undefined>(undefined);

  constructor(
    private bookServices: BookServices,
    private route: ActivatedRoute,
    private errorService: ErrorService,
  ) {}

  bookForm = new FormGroup(
    {
      query: new FormControl(''),
      category: new FormControl(''),
      startRange: new FormControl(null),
      endRange: new FormControl(null),
    },
    [rangeValidator],
  );

  ngOnInit() {
    const data = this.route.snapshot.data['data'];
    if (data) {
      const bookArray = Object.keys(data).map((key) => ({
        ...data[key],
      }));
      this.books.set(bookArray);
    }
  }

  searchFn() {
    const { query, category, startRange, endRange } =
      this.bookForm.getRawValue();
    console.log(startRange, endRange);

    if (this.bookForm.invalid) {
      alert('enter valid range');
      return;
    }
    this.bookServices.getAllBooks().subscribe({
      next: (data) => {
        if (!data) {
          this.books.set([]);
          return;
        }

        const bookArray = Object.entries(data).map(([key, value]) => ({
          ...(value as BookDetailsDTO),
          id: key,
        }));

        const normalizedQuery = query?.trim().toLowerCase();

        const finalArray = bookArray.filter((book) => {
          const titleMatches = normalizedQuery
            ? book.title.toLowerCase().includes(normalizedQuery)
            : true;
          const authorMatches = normalizedQuery
            ? (book.author?.toLowerCase().includes(normalizedQuery) ?? false)
            : true;
          const matchesQuery = normalizedQuery
            ? titleMatches || authorMatches
            : true;

          const matchesCategory = category ? book.category === category : true;

          const matchesPriceRange =
            startRange && endRange
              ? book.price >= Number(startRange) &&
                book.price <= Number(endRange)
              : true;

          return matchesQuery && matchesCategory && matchesPriceRange;
        });

        this.books.set(finalArray);
      },
      error: (error) => {
        this.errorService.notifyError(error);
        this.books.set([]);
      },
    });
  }
}

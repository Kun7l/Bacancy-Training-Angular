import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  signal,
  SimpleChanges,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IBookDetails } from '../../../types/book-type';
import { BookDTO } from '../../../types/bookDTO';
import { BookItem } from '../book-item/book-item';

@Component({
  selector: 'app-book-action',
  imports: [ReactiveFormsModule],
  templateUrl: './book-action.html',
  styleUrl: './book-action.css',
})
export class BookAction implements OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['book'] && this.book()) {
      const book = this.book();

      this.bookForm.patchValue({
        title: book.title,
        author: book.author,
        description: book.description,
        price: book.price,
      });
    }
  }
  
  @Input() isAddActive = signal(false);
  @Input() showCloseButton = true;
  @Output() closeButtonEvent = new EventEmitter<void>();

  @Input() book = signal<IBookDetails>({
    id: 0,
    title: '',
    author: '',
    description: '',
    price: 0,
    imgSource: '',
  });

  bookForm = new FormGroup({
    title: new FormControl<string>(this.book().title, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    author: new FormControl<string>(this.book().author, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    description: new FormControl<string>(this.book().description, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    price: new FormControl<number>(this.book().price, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(1)],
    }),
  });

  @Output() addBookEvent = new EventEmitter<BookDTO>();
  @Output() editBookEvent = new EventEmitter<IBookDetails>();

  onSubmit() {
    if (this.isAddActive()) {
      if (this.bookForm.valid) {
        const newBook: BookDTO = this.bookForm.getRawValue();
        this.addBookEvent.emit(newBook);
      } else {
        alert('form not valid');
      }
    } else {
      if (this.bookForm.valid) {
        const newBookDTO: BookDTO = this.bookForm.getRawValue();
        const newBook: IBookDetails = {
          id: this.book().id,
          title: newBookDTO.title,
          author: newBookDTO.author,
          description: newBookDTO.description,
          price: newBookDTO.price,
          imgSource: this.book().imgSource,
        };
        this.editBookEvent.emit(newBook);
      } else {
        alert('form not valid');
      }
    }
  }
  closeButton() {
    this.closeButtonEvent.emit();
  }
}

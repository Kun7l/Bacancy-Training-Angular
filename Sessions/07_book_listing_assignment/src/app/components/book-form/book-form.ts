import { Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { IBookDetails } from '../../types/book-type';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';


@Component({
  selector: 'app-book-form',
  imports: [ReactiveFormsModule],
  templateUrl: './book-form.html',
  styleUrl: './book-form.css',
  encapsulation: ViewEncapsulation.ShadowDom
})
export class BookForm {
  @Output() bookAddedEvent = new EventEmitter<IBookDetails>();
  bookForm = new FormGroup({
    title: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    author: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    description: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    price: new FormControl<number>(0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(1)],
    }),
  });

  onSubmit() {
    if (this.bookForm.valid) {
      const newBook: IBookDetails = this.bookForm.getRawValue();
      this.bookAddedEvent.emit(newBook);
    } else {
      alert('form not valid');
    }
  }
}

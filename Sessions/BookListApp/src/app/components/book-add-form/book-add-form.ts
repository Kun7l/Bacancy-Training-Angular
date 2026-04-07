import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BookServices } from '../../services/book-services';
import { BookDetailsDTO } from '../../types/bookdto.type';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorService } from '../../services/error-service';

@Component({
  selector: 'app-book-add-form',
  imports: [ReactiveFormsModule],
  templateUrl: './book-add-form.html',
  styleUrl: './book-add-form.css',
})
export class BookAddForm {
  constructor(
    private bookService: BookServices,
    private router: Router,
    private route: ActivatedRoute,
    private errorService: ErrorService,
  ) {}

  defaultValue: BookDetailsDTO = {
    title: 'new book',
    author: 'krunal',
    price: 100,
    category: 'sports',
  };
  bookFormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    author: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    price: new FormControl(0, [Validators.required]),
    imageUrl: new FormControl('', [Validators.required]),
  });

  setValueFn() {
    this.bookFormGroup.patchValue(this.defaultValue);
  }

  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      this.bookFormGroup.patchValue({ imageUrl: '' });
      return;
    }

    if (!file.type.startsWith('image/')) {
      this.errorService.notifyError('Please select a valid image file');
      input.value = '';
      this.bookFormGroup.patchValue({ imageUrl: '' });
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      this.bookFormGroup.patchValue({ imageUrl: reader.result as string });
    };
    reader.readAsDataURL(file);
  }

  onSubmit() {
    if (this.bookFormGroup.invalid) {
      alert('enter valid details');
      return;
    }

    const newBook = this.bookFormGroup.getRawValue() as BookDetailsDTO;
    this.bookService.addBook(newBook).subscribe({
      next: () => {
        this.router.navigate(['books']);
      },
      error: (error) => {
        this.errorService.notifyError(error);
      },
    });
  }
}

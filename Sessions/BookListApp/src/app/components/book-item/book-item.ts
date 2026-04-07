import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BookDetailsDTO } from '../../types/bookdto.type';

@Component({
  selector: 'app-book-item',
  imports: [CommonModule],
  templateUrl: './book-item.html',
  styleUrl: './book-item.css',
})
export class BookItem {
  @Input() book: BookDetailsDTO | undefined = undefined;
}

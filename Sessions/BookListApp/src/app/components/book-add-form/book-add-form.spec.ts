import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookAddForm } from './book-add-form';

describe('BookAddForm', () => {
  let component: BookAddForm;
  let fixture: ComponentFixture<BookAddForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookAddForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookAddForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

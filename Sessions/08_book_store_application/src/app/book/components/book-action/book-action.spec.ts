import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookAction } from './book-action';

describe('BookAction', () => {
  let component: BookAction;
  let fixture: ComponentFixture<BookAction>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookAction]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookAction);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

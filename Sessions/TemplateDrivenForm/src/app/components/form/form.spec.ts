import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Form } from './form';
import { signal } from '@angular/core';

describe('Form', () => {
  let component: Form;
  let fixture: ComponentFixture<Form>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Form]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Form);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

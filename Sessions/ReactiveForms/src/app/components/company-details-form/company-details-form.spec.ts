import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyDetailsForm } from './company-details-form';

describe('CompanyDetailsForm', () => {
  let component: CompanyDetailsForm;
  let fixture: ComponentFixture<CompanyDetailsForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyDetailsForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyDetailsForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

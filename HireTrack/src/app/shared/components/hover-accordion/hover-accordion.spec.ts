import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoverAccordion } from './hover-accordion';

describe('HoverAccordion', () => {
  let component: HoverAccordion;
  let fixture: ComponentFixture<HoverAccordion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HoverAccordion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HoverAccordion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialMediaFeed } from './social-media-feed';

describe('SocialMediaFeed', () => {
  let component: SocialMediaFeed;
  let fixture: ComponentFixture<SocialMediaFeed>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocialMediaFeed]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocialMediaFeed);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

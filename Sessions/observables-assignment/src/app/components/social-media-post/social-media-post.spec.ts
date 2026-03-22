import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialMediaPost } from './social-media-post';

describe('SocialMediaPost', () => {
  let component: SocialMediaPost;
  let fixture: ComponentFixture<SocialMediaPost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocialMediaPost]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocialMediaPost);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

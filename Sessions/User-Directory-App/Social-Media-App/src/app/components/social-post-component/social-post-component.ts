import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Post } from '../../types/post.type';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-social-post-component',
  imports: [DatePipe],
  templateUrl: './social-post-component.html',
  styleUrl: './social-post-component.css',
})
export class SocialPostComponent {
  @Input() post: Post | undefined = undefined;
  @Output() deletePostEvent = new EventEmitter<void>();
  @Output() likeButtonEvent = new EventEmitter<void>();

  deletePost() {
    this.deletePostEvent.emit();
  }
  likeButton() {
    this.likeButtonEvent.emit();
  }
}

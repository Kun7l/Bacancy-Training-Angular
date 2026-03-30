import { Component, input, linkedSignal, output } from '@angular/core';
import { PostDetails } from '../../post-type';

@Component({
  selector: 'app-social-media-post',
  imports: [],
  templateUrl: './social-media-post.html',
  styleUrl: './social-media-post.css',
})
export class SocialMediaPost {
  post = input<PostDetails | undefined>(undefined);
  likeButtonEvent = output<number>();

  likeButton(id: number) {
    this.likeButtonEvent.emit(id);
  }
}

import { Component, signal } from '@angular/core';
import { PostDetails } from '../../post-type';
import { SocialMediaPost } from '../social-media-post/social-media-post';
import { map } from 'rxjs';

@Component({
  selector: 'app-social-media-feed',
  imports: [SocialMediaPost],
  templateUrl: './social-media-feed.html',
  styleUrl: './social-media-feed.css',
})
export class SocialMediaFeed {
  initalPosts = signal<PostDetails[]>([
    {
      id: 0,
      content: 'This is post 1',
      likes: 0,
    },
    {
      id: 1,
      content: 'This is post 2',
      likes: 0,
    },
    {
      id: 2,
      content: 'This is post 3',
      likes: 0,
    },
  ]);

  updateLike(newId: number) {
    this.initalPosts.update((posts) =>
      posts.map((post, index) =>
        index == newId ? { ...post, likes: post.likes + 1 } : post,
      ),
    );
  }
}

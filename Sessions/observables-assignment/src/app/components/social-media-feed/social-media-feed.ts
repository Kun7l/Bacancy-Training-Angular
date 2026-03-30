import { Component, computed, signal } from '@angular/core';
import { PostDetails } from '../../post-type';
import { SocialMediaPost } from '../social-media-post/social-media-post';
import { map, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-social-media-feed',
  imports: [SocialMediaPost],
  templateUrl: './social-media-feed.html',
  styleUrl: './social-media-feed.css',
})
export class SocialMediaFeed {
  subscription: Subscription | undefined;
  isFeedStopped = true;

  initalPosts = signal<PostDetails[]>([
    { id: 0, content: 'This is post 1', likes: 0 },
    { id: 1, content: 'This is post 2', likes: 0 },
    { id: 2, content: 'This is post 3', likes: 0 },
  ]);

  updateLike(newId: number) {
    this.initalPosts.update((posts) =>
      posts.map((post, index) =>
        index === newId ? { ...post, likes: post.likes + 1 } : post,
      ),
    );
  }

  totalLikes = computed(() => {
    return this.initalPosts().reduce((sum, post) => sum + post.likes, 0);
  });

  myObservable$ = new Observable<PostDetails>((observer) => {
    const intervalId = setInterval(() => {
      const newPost: PostDetails = {
        id: this.initalPosts().length,
        content: 'new content ' + (this.initalPosts().length + 1),
        likes: 0,
      };

      observer.next(newPost);
    }, 2000);

    return () => clearInterval(intervalId);
  });

  subscribeFeed() {
    this.subscription = this.myObservable$.subscribe({
      next: (val) => {
        this.initalPosts.update((posts) => [...posts, val]);
      },
      complete: () => console.log('Done!'),
    });
  }
  unsubscribeFeed() {
    if (this.subscription != undefined) {
      this.subscription.unsubscribe();
    }
  }

  toggleFeed() {
    if (this.isFeedStopped) {
      this.subscribeFeed();
      this.isFeedStopped = false;
    } else {
      this.unsubscribeFeed();
      this.isFeedStopped = true;
    }
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}


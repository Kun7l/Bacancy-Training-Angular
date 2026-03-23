import { Component, signal } from '@angular/core';
import { PostDetails } from '../../post-type';
import { SocialMediaPost } from '../social-media-post/social-media-post';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-social-media-feed',
  imports: [SocialMediaPost],
  templateUrl: './social-media-feed.html',
  styleUrl: './social-media-feed.css',
})
export class SocialMediaFeed {
  initalPosts = signal<PostDetails[]>([
    { id: 0, content: 'This is post 1', likes: 0 },
    { id: 1, content: 'This is post 2', likes: 0 },
    { id: 2, content: 'This is post 3', likes: 0 },
  ]);

  isStopped = false;

  myObservable$ = new Observable<PostDetails>((observer) => {
    const intervalId = setInterval(() => {
      if (this.isStopped) {
        observer.complete();
        clearInterval(intervalId);
        return;
      }

      const newPost: PostDetails = {
        id: this.initalPosts().length,
        content: 'new content ' + (this.initalPosts().length + 1),
        likes: 0,
      };

      observer.next(newPost);
    }, 2000);

    return () => clearInterval(intervalId);
  });

  subscription = this.myObservable$.subscribe({
    next: (val) => {
      this.initalPosts.update((posts) => [...posts, val]);
    },
    complete: () => console.log('Done!'),
  });

  updateLike(newId: number) {
    this.initalPosts.update((posts) =>
      posts.map((post, index) =>
        index === newId ? { ...post, likes: post.likes + 1 } : post,
      ),
    );
  }

  stopFeed() {
    this.isStopped = true;
  }

  totalLikes(): number {
    let likes = 0;
    this.initalPosts().map((post) => (likes += post.likes));
    console.log(likes);
    return likes;
  }
}

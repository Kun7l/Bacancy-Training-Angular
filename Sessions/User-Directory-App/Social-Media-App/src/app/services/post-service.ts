import { Injectable, signal } from '@angular/core';
import { Post } from '../types/post.type';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  postList = signal<Post[]>([
    {
      id: 0,
      title: 'How is the weather?',
      content: 'The weather at ahmedabad is !good',
      likes: 100,
      dateOfPosting: new Date('01-01-2026'),
    },
  ]);

  getAllPosts() {
    return this.postList();
  }
  addPost(newPost: Post) {
    this.postList.update((posts) => [...posts, newPost]);
  }
  increaseLike(postId: number) {
    this.postList.update((posts) =>
      posts.map((p) => (p.id === postId ? { ...p, likes: p.likes + 1 } : p)),
    );
  }
}

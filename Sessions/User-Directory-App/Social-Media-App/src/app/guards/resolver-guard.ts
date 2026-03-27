// post.resolver.ts
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { PostService } from '../services/post-service';
import { Post } from '../types/post.type';

export const postsResolver: ResolveFn<Post[]> = (route, state) => {
  const postService = inject(PostService);
  return postService.getAllPosts();
};

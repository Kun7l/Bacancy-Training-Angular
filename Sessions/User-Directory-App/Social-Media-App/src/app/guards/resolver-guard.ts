// post.resolver.ts
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { PostService } from '../services/post-service';
import { Post } from '../types/post.type';
import { PostDTO } from '../types/postDto.type';

export const postsResolver: ResolveFn<PostDTO[]> = (route, state) => {
  const postService = inject(PostService);
  return postService.getAllPosts();
};

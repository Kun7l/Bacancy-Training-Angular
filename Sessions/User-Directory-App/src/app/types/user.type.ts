import { Post } from './post.type';

export interface User {
  id: number;
  name: string;
  followers: number;
  followings: number;
  posts: Post[];
}

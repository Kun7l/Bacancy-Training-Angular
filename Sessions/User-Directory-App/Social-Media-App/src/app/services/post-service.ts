import { Injectable, signal } from '@angular/core';
import { Post } from '../types/post.type';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostDTO } from '../types/postDto.type';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  baseUrl =
    'https://test-firebase-2dc38-default-rtdb.asia-southeast1.firebasedatabase.app/posts';

  getAllPosts(): Observable<PostDTO[]> {
    return this.http.get<PostDTO[]>(this.baseUrl + '.json');
  }
  getPostById(postId: string) {
    return this.http.get(this.baseUrl + postId + '.json');
  }
  addPost(newPost: PostDTO) {
    console.log(newPost);
    return this.http.post(this.baseUrl + '.json', newPost);
  }
  deleteAllPosts() {
    return this.http.delete(this.baseUrl + '.json');
  }
  deletePostById(postId: string) {
    return this.http.delete(this.baseUrl + '/' + postId + '.json');
  }
  increaseLike(postId: string, likes: number) {
    return this.http.patch(this.baseUrl + '/' + postId + '.json', {
      likes: likes,
    });
  }
}

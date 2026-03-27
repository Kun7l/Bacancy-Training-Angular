import { Component, signal } from '@angular/core';
import { Post } from '../../types/post.type';
import { PostService } from '../../services/post-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-post-form',
  imports: [],
  templateUrl: './post-form.html',
  styleUrl: './post-form.css',
})
export class PostForm {
  constructor(
    private postService: PostService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  private isSaved = signal<boolean>(false);

  isSavedFn() {
    return this.isSaved();
  }

  addPost(title: string, content: string) {
    const newPost: Post = {
      id: this.postService.postList().length,
      title: title,
      content: content,
      likes: 0,
      dateOfPosting: new Date(),
    };
    this.postService.addPost(newPost);
    this.isSaved.set(true);
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}

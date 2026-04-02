import { Component, signal, ViewChild } from '@angular/core';
import { Post } from '../../types/post.type';
import { PostService } from '../../services/post-service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-post-form',
  imports: [FormsModule],
  templateUrl: './post-form.html',
  styleUrl: './post-form.css',
})
export class PostForm {
  constructor(
    private postService: PostService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  public isSaved = signal<boolean>(false);
  @ViewChild('postForm') postForm!: NgForm;

  isSavedFn() {
    if (!this.postForm) return true;
    return !this.postForm.dirty || this.isSaved();
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

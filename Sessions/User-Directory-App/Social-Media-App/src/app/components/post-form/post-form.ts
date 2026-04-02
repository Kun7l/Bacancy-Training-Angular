import { Component, signal } from '@angular/core';
import { Post } from '../../types/post.type';
import { PostService } from '../../services/post-service';
import { ActivatedRoute, Router } from '@angular/router';
import { PostDTO } from '../../types/postDto.type';

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
    const newPost: PostDTO = {
      title: title,
      content: content,
      likes: 0,
      dateOfPosting: new Date(),
    };
    this.postService.addPost(newPost).subscribe({
      next: (response) => {
        console.log('Post saved!', response);
        this.isSaved.set(true);
        this.router.navigate(['../'], { relativeTo: this.route });
      },
      error: (err) => console.error('Upload failed', err),
    });
  }
}

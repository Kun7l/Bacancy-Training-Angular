import { Component, signal } from '@angular/core';
import { PostService } from '../../services/post-service';
import { ActivatedRoute, Router } from '@angular/router';
import { PostDTO } from '../../types/postDto.type';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-post-form',
  imports: [ReactiveFormsModule],
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
    return !this.postForm.dirty || this.isSaved();
  }

  postForm = new FormGroup<{
    postTitle: FormControl<string>;
    postContent: FormControl<string>;
  }>({
    postTitle: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    postContent: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  addPost() {
    if (this.postForm.invalid) {
      alert('Form is invalid');
      return;
    }
    const submittedValue = this.postForm.getRawValue();
    const newPost: PostDTO = {
      title: submittedValue.postTitle!,
      content: submittedValue.postContent!,
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

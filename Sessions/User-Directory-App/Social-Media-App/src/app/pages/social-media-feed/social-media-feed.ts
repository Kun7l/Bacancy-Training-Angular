import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../../types/post.type';
import { PostService } from '../../services/post-service';
import { PostDTO } from '../../types/postDto.type';
import { SocialPostComponent } from '../../components/social-post-component/social-post-component';
import { map, take } from 'rxjs';

@Component({
  selector: 'app-posts',
  imports: [SocialPostComponent],
  templateUrl: './social-media-feed.html',
  styleUrl: './social-media-feed.css',
})
export class Posts {
  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
  ) {}
  postList: Post[] = [];

  ngOnInit() {
    this.route.data
      .pipe(
        map((data) =>
          Object.entries(data['posts'] as Record<string, PostDTO>).map(
            ([key, value]) => ({
              id: key,
              ...value,
            }),
          ),
        ),
        take(1),
      )
      .subscribe((posts) => {
        this.postList = posts;
        console.log(this.postList);
      });
  }

  likeButton(post: Post) {
    post.likes++;
    this.postService.increaseLike(post.id, post.likes).subscribe({
      next: (data) => {
        console.log('updated likes', data);
      },
      error: (err) => {
        console.log(err);
        post.likes--;
      },
    });
  }

  deletePost(post: Post) {
    const previousPosts = [...this.postList];

    this.postList = this.postList.filter((p) => p.id !== post.id);

    this.postService.deletePostById(post.id).subscribe({
      next: () => {
        console.log('Deleted successfully');
      },
      error: (err) => {
        console.log(err);
        this.postList = previousPosts;
      },
    });
  }
}

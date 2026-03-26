import { Component } from '@angular/core';
import { Post } from '../../types/post.type';
import { UserServices } from '../../services/user-services';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-post-details',
  imports: [],
  templateUrl: './post-details.html',
  styleUrl: './post-details.css',
})
export class PostDetails {
  constructor(
    private userService: UserServices,
    private route: ActivatedRoute,
    private router: Router,
  ) {}
  posts: Post[] = [];
  userId = 0;
  ngOnInit() {
    let sortOrder;

    this.route.parent?.params.subscribe((params) => {
      this.userId = params['id'];
    });
    this.route.queryParams.subscribe((params) => {
      sortOrder = params['sort'];
    });
    this.posts = this.userService.getPosts(Number(this.userId));
    if (sortOrder == 'asc') {
      this.posts.sort((a, b) => a.likes - b.likes);
    }
    console.log(this.posts);
  }

  onBackClick() {
    this.router.navigate(['../'],{relativeTo:this.route});
  }
}

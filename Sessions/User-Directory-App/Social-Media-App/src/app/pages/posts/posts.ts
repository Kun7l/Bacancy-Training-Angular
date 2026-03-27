import { Component } from '@angular/core';
import { Post } from '../../types/post.type';
import { PostService } from '../../services/post-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-posts',
  imports: [],
  templateUrl: './posts.html',
  styleUrl: './posts.css',
})
export class Posts {
  constructor(private route: ActivatedRoute) {}
  postList: Post[] = [];

  ngOnInit() {
    this.postList = this.route.snapshot.data['postData'];
  }
}

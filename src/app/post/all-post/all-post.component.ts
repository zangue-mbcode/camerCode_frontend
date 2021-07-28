import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostService } from 'src/app/services/post.service';
import { Post } from '../../models/Post.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-all-post',
  templateUrl: './all-post.component.html',
  styleUrls: ['./all-post.component.scss']
})
export class AllPostComponent implements OnInit, OnDestroy {


  private postSub!: Subscription;
  public posts: Post[] = [];

  constructor(private postService: PostService, private router: Router) { 

  }

  ngOnInit(): void {
    this.postSub = this.postService.post$.subscribe(
      (post) => {
        this.posts = post;
        console.log("Post : ", this.posts)
      }
    );
    this.postService.getPost();

  }


  onPostClicked(id: string) {
      this.router.navigate(['/auth/post/' + id]);
  }

  ngOnDestroy() {
    this.postSub.unsubscribe();
  }

}

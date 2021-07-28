import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Post } from 'src/app/models/Post.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  userId: string = '';
  post!: Post;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postService: PostService,
    private auth: AuthService) { }

 
    ngOnInit() {
      this.userId = this.auth.userId;
      this.route.params.subscribe(
        (params: Params) => {
          this.postService.getPostById(params.id).then(
            (post: any) => {
              this.post = post;
            }
          );
        }
      );
 
    }
  
    onGoBack() {
      this.router.navigate(['/auth/all-post']);
    }
  
    onModify() {
      this.router.navigate(['/auth/modify-post/'+this.post._id]);
    }
  
    onDelete() {
      this.postService.deletePost(this.post._id).then(
        () => {
          this.router.navigate(['/auth/all-post']);
        }
      );
    }
  
}

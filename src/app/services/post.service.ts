import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from '../models/Post.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) {}

  private post: Post[] = [];
  public post$ = new Subject<Post[]>();

  getPost() {
    this.http.get('http://localhost:3000/api/post').subscribe(
      (post: any) => {
        if (post) {
          this.post = post;
          this.emitPost();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  emitPost() {
    this.post$.next(this.post);
  }

  getPostById(id: string) {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:3000/api/post/' + id).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  createNewPost(Post: Post) {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/api/post', Post).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  modifyPost(id: string, Post: Post) {
    return new Promise((resolve, reject) => {
      this.http.put('http://localhost:3000/api/post/' + id, Post).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }


  deletePost(id: string) {
    return new Promise((resolve, reject) => {
      this.http.delete('http://localhost:3000/api/post/' + id).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
}

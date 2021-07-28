
import { Component, VERSION, OnInit } from "@angular/core";
import { UploadResult, MdEditorOption } from "ngx-markdown-editor";
import { Post } from "src/app/models/Post.model";
import { AuthService } from "src/app/services/auth.service";
import { PostService } from "src/app/services/post.service";
import { Router } from '@angular/router';



@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {

  public options: MdEditorOption = {
    showPreviewPanel: true,
    enablePreviewContentClick: false,
    resizable: true,
    customRender: {
      image: function(href: string, title: string, text: string) {
        let out = `<img style="max-width: 100%; border: 20px solid red;" src="${href}" alt="${text}"`;
        if (title) {
          out += ` title="${title}"`;
        }
        out += (<any>this.options).xhtml ? '/>' : '>';
        return out;
      }
    }
  };
  public userId: string;
  public htmlContent: string = "";
  public content: string = "";
  public mode: string = "editor";
  errorMessage: string = '';
  constructor(private postService: PostService, private auth: AuthService, private router: Router) {
    this.preRender = this.preRender.bind(this);
    this.postRender = this.postRender.bind(this);
    this.userId = this.auth.userId;
  }

  ngOnInit() {
    // let contentArr = ["# Hello, Markdown Editor!"];
    // contentArr.push("```javascript ");
    // contentArr.push("function Test() {");
    // contentArr.push('	console.log("Test");');
    // contentArr.push("}");
    // contentArr.push("```");
    // contentArr.push(" Name | Type");
    // contentArr.push(" ---- | ----");
    // contentArr.push(" A | Test");
    // contentArr.push(
    //   "![](http://lon-yang.github.io/markdown-editor/favicon.ico)"
    // );
    // contentArr.push("");
    // contentArr.push("- [ ] Taks A");
    // contentArr.push("- [x] Taks B");
    // contentArr.push("- test");
    // contentArr.push("");
    // contentArr.push("[Link](https://www.google.com)");
    // contentArr.push("");
    // this.content = contentArr.join("\r\n");
  }

  togglePreviewPanel() {
    this.options.showPreviewPanel = !this.options.showPreviewPanel;
    this.options = Object.assign({}, this.options);
  }

  changeMode() {
    if (this.mode === "editor") {
      this.mode = "preview";
    } else {
      this.mode = "editor";
    }
  }

  togglePreviewClick() {
    this.options.enablePreviewContentClick = !this.options
      .enablePreviewContentClick;
    this.options = Object.assign({}, this.options);
  }

  toggleResizeAble() {
    this.options.resizable = !this.options.resizable;
    this.options = Object.assign({}, this.options);
  }

  doUpload(files: Array<File>): Promise<Array<UploadResult>> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let result: Array<UploadResult> = [];
        for (let file of files) {
          result.push({
            name: file.name,
            url: `https://avatars3.githubusercontent.com/${file.name}`,
            isImg: file.type.indexOf("image") !== -1
          });
        }
        resolve(result);
      }, 3000);
    });
  }

  onEditorLoaded(editor: any) {
    //console.log(`ACE Editor Ins: `, editor);
    // editor.setOption('showLineNumbers', false);

    // setTimeout(() => {
    //   editor.setOption('showLineNumbers', true);
    // }, 2000);
  }

  preRender(mdContent: any) {
    //console.log(`preRender fired`, mdContent);
    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve(mdContent);
    //   }, 4000);
    // })
    return mdContent;
  }

  postRender(html: any) {
    //console.log(`postRender fired`, html);
    // return '<h1>Test</h1>';
    return html;
  }

  onPreviewDomChanged(dom: HTMLElement) {
    //console.log(dom);
    this.htmlContent = dom.innerHTML;
    //console.log(dom.innerHTML);
  }

 


  onSubmit() {
    const post = new Post();
    post.title = (<HTMLInputElement>document.getElementById("title")).value;
    post.htmlContent = this.htmlContent;
    post.content = this.content;
    post._id = new Date().getTime().toString();
    post.userId = this.userId;
    console.log(`post`, post);
    this.postService.createNewPost(post).then(
      (response: any) => {
        console.log("response : ", response)
        this.router.navigate(['/auth/all-post']);
      
      }
    ).catch(
      (error: any) => {
        console.log(error)
        this.errorMessage = error.message;
      }
    );
  }

}

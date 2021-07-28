import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { SecurityComponent } from './security/security.component';
import { LMarkdownEditorModule } from 'ngx-markdown-editor';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './security/auth/login/login.component';
import { SignupComponent } from './security/auth/signup/signup.component';
import { NewPostComponent } from './post/new-post/new-post.component';
import { ModifyPostComponent } from './post/modify-post/modify-post.component';
import { AllPostComponent } from './post/all-post/all-post.component';
import { PostComponent } from './post/post/post.component';
import { AuthGuard } from './services/auth-guard.service';
@NgModule({
  declarations: [
    AppComponent,
    SecurityComponent,
    NewPostComponent,
    ModifyPostComponent,
    AllPostComponent,
    PostComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LMarkdownEditorModule
  ],
  providers: [
    AuthGuard,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

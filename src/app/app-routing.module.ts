import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth-guard.service';
import { NewPostComponent } from './post/new-post/new-post.component';
import { SecurityComponent } from './security/security.component';
import { AllPostComponent } from './post/all-post/all-post.component';
import { PostComponent } from './post/post/post.component';
import { ModifyPostComponent } from './post/modify-post/modify-post.component';
import { LoginComponent } from './security/auth/login/login.component';
import { SignupComponent } from './security/auth/signup/signup.component';

const routes: Routes = [
  { path: 'auth', component: SecurityComponent,
  children: [
    { path: 'new-post', component: NewPostComponent, canActivate: [AuthGuard] },
    { path: 'all-post', component: AllPostComponent, canActivate: [AuthGuard] },
    { path: 'post/:id', component: PostComponent, canActivate: [AuthGuard] },
    { path: 'modify-post/:id', component: ModifyPostComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: '', pathMatch: 'full', redirectTo: 'login' },
  ]
},
{ path: '', pathMatch: 'full', redirectTo: 'auth/login' },
{ path: '**', redirectTo: 'auth/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StateService } from '../services/state.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  public isAuth!: boolean;

  private isAuthSub!: Subscription;

  constructor(private state: StateService,
              private auth: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.isAuthSub = this.auth.isAuth$.subscribe(
      (auth) => {
        this.isAuth = auth;
      }
    );
  }

  onLogout() {
    this.auth.logout();
    this.router.navigate(['/auth/login']);
  }

  ngOnDestroy() {
    this.isAuthSub.unsubscribe();
  }

}

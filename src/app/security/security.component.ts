import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateService } from '../services/state.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss']
})
export class SecurityComponent implements OnInit, OnDestroy {

  
  constructor(private state: StateService,
    private auth: AuthService) { }

  ngOnInit() {
  this.auth.isAuth$.next(false);
  this.auth.userId = '';
  this.auth.token = '';
  this.state.part$.next(3);
  this.state.part = 3;
  }

  ngOnDestroy() {
  }

}

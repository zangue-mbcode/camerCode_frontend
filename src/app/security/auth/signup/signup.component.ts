import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { StateService } from '../../../services/state.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;
  errorMessage!: string;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private auth: AuthService,
              private state: StateService) { }

  ngOnInit() {
    this.state.mode$.next('form');
    this.signupForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    });
  }

  onSignup() {
    const email = this.signupForm.get('email')!.value;
    const password = this.signupForm.get('password')!.value;
    this.auth.createNewUser(email, password).then(
      () => {
          this.router.navigate(['/auth/all-post']);
      }
    ).catch(
      (error) => {
        this.errorMessage = error.message;
      }
    );
  }
}

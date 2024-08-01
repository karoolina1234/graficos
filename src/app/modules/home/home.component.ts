import { UserService } from './../../services/user/user.service';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AuthRequest } from 'src/app/models/interfaces/user/auth/AuthUser';
import {
  SiginUpUserReq,
  SiginUpUserResponse,
} from 'src/app/models/interfaces/user/SiginUpUserReq';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  LoginCard = true;

  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  signUpForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private cookieService: CookieService
  ) {}
  onSubmitLoginForm(): void {
    if (this.loginForm.value && this.loginForm.valid) {
      this.userService.athUser(this.loginForm.value as AuthRequest).subscribe({
        next: (response) => {
          if (response) {
            this.cookieService.set('USER_INFO', response?.token);
            this.loginForm.reset();
          }
        },
        error: (error) => console.log(error),
      });
    }
  }

  onSubmitSignUpForm(): void {
    if (this.signUpForm.value && this.signUpForm.valid) {
      this.userService
        .signupUser(this.signUpForm.value as SiginUpUserReq)
        .subscribe({
          next: (response) => {
            if (response) {
              this.signUpForm.reset();
              this.LoginCard = true;
            }
          },
          error: (error) => console.log(error),
        });
    }
  }
}

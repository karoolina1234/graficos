import { UserService } from './../../services/user/user.service';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
    private userService: UserService
  ) {}
  onSubmitLoginForm(): void {
    console.log('login', this.loginForm.value);
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

import { UserService } from './../../services/user/user.service';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
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
    private cookieService: CookieService,
    private messageService: MessageService,
    private router: Router
  ) {}
  onSubmitLoginForm(): void {
    if (this.loginForm.value && this.loginForm.valid) {
      this.userService.athUser(this.loginForm.value as AuthRequest).subscribe({
        next: (response) => {
          if (response) {
            this.cookieService.set('USER_INFO', response?.token);
            this.loginForm.reset();
            this.router.navigate(['/dashboard']);
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso!',
              detail: `Bem vindo(a) ${response.name}`,
              life: 2000,
            });
          }
        },
        error: (error) =>
          this.messageService.add({
            severity: 'error',
            summary: 'ERRO!',
            detail: `${error}`,
            life: 2000,
          }),
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
              this.messageService.add({
                severity: 'success',
                summary: 'Sucesso!',
                detail: `Usuário cadastrado com sucesso!`,
                life: 2000,
              });
            }
          },
          error: (error) =>
            this.messageService.add({
              severity: 'error',
              summary: 'ERRO!',
              detail: `${error}`,
              life: 2000,
            }),
        });
    }
  }
}

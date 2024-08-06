import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import {
  AuthRequest,
  AuthResponse,
} from 'src/app/models/interfaces/user/auth/AuthUser';
import {
  SiginUpUserReq,
  SiginUpUserResponse,
} from 'src/app/models/interfaces/user/SiginUpUserReq';
import { enviroment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private API_URL = enviroment.API_URL;
  constructor(private http: HttpClient, private cookie: CookieService) {}

  signupUser(req: SiginUpUserReq): Observable<SiginUpUserResponse> {
    return this.http.post<SiginUpUserResponse>(`${this.API_URL}/user`, req);
  }

  athUser(req: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/auth`, req);
  }

  isLoggeIn(): boolean {
    const jwt_token = this.cookie.get('USER_INFO');
    return jwt_token ? true : false;
  }
}

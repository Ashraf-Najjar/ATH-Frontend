import { Injectable } from '@angular/core';
import { ILogin } from '../interfaces/login.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IUser } from 'src/app/user/interfaces/user.interface';
import { Observable } from 'rxjs';
import { ISignup } from '../interfaces/signup.interface';
import { IAuthService } from '../interfaces/auth.service.interface';

const BASE_URL = environment.apiUrl + "auth/";

@Injectable({
  providedIn: 'root'
})
export class AuthRestService implements IAuthService {

  constructor(
    private http: HttpClient
  ) { }

  login(user: ILogin): Observable<{ message: string, result: { user: IUser, token: string } }> {
    return this.http
      .post<{ message: string, result: { user: IUser, token: string } }>(
        BASE_URL + "login",
        user
      )
  }

  signup(user: ISignup): Observable<{ message: string, result: { user: IUser, token: string } }> {
    return this.http
      .post<{ message: string, result: { user: IUser, token: string } }>(
        BASE_URL + "signup",
        user
      )
  }

}

import { Observable } from "rxjs";
import { IUser } from "src/app/user/interfaces/user.interface";
import { ILogin } from "./login.interface";
import { ISignup } from "./signup.interface";

export interface IAuthService {
    login(user: ILogin): Observable<{ message: string, result: {user: IUser, token: string }}>;

    signup(user: ISignup): Observable<{ message: string, result: {user: IUser, token: string }}>;

  }
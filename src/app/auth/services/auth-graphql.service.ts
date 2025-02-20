import { Injectable } from "@angular/core";
import { ILogin } from "../interfaces/login.interface";
import { IUser } from "src/app/user/interfaces/user.interface";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthGraphQLService {

    // login(user: ILogin): Observable<{ user: IUser, token: string }> {

    // }

    signup(user: IUser): void {

    }

    logout(): void {

    }
}
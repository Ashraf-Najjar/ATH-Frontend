import { Injectable } from '@angular/core';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { IUser } from 'src/app/user/interfaces/user.interface';
import { AuthFactoryService } from './auth-factory.service';
import { IAuthService } from '../interfaces/auth.service.interface';
import { ILogin } from '../interfaces/login.interface';
import { catchError, map, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { ISignup } from '../interfaces/signup.interface';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private user!: IUser | undefined;
    private token!: string;

    authAPIService: IAuthService = this.authFactoryService.getAuthService();

    constructor(
        private router: Router,
        private localStorageService: LocalStorageService,
        private authFactoryService: AuthFactoryService
    ) { }

    private saveUser(user: IUser) {
        this.localStorageService.set("user", user);
    }

    private saveToken(token: string) {
        this.localStorageService.set("token", token);
    }

    private saveAuthData(user: IUser, token: string) {
        this.saveUser(user);
        this.saveToken(token);
    }

    private clearAuthData() {
        this.localStorageService.remove("user").remove("token");
        this.setUser(undefined);
        this.saveToken("");
    }

    private getAuthData(): { user: IUser | undefined, token: string } {
        const user: IUser | undefined = this.localStorageService.get<IUser>("user") || undefined;
        const token = this.localStorageService.get<string>("token") ?? "";
        return { user, token }
    }

    getToken(): string {
        return this.token;
    }

    getUser(): IUser | undefined {
        return this.user;
    }

    setUser(user: IUser | undefined): void {
        this.user = user;
    }

    setToken(token: string): void {
        this.token = token;
    }
    autoAuthUser() {
        const authInformation = this.getAuthData();
        this.setUser(authInformation?.user);
        this.setToken(authInformation?.token);
    }

    login(user: ILogin): Observable<{ success: boolean }> {
        return this.authAPIService.login(user).pipe(
            map((response) => {
                const result = response?.result;
                if (!result) {
                    return { success: false };
                }
                this.setUser(result?.user);
                this.setToken(result?.token);
                this.saveAuthData(result?.user, result?.token);
                return { success: true };
            }),

            catchError(() => of({ success: false }))
        )
    }

    signup(user: ISignup): Observable<{ success: boolean }> {
        return this.authAPIService.signup(user).pipe(
            map((response) => {
                const result = response?.result;
                if (!result) {
                    return { success: false };
                }
                this.setUser(result?.user);
                this.setToken(result?.token);
                this.saveAuthData(result?.user, result?.token);
                return { success: true };
            }),

            catchError(() => of({ success: false }))
        )
    }

    logout() {
        this.clearAuthData();
        this.router.navigate(["/auth/login"])
    }
}

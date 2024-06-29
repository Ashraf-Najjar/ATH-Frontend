import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/user.interface';
import { environment } from 'src/environments/environment';

const BASE_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(skip: number, limit: number): Observable<IUser[]> {
    const queryParams = `?skip=${skip}&limit=${limit}`;
    const url = `${BASE_URL}user/list` + queryParams;
    return this.http.get<IUser[]>(url);
  }

  createUser(user: any) {
    return this.http.post<{ message: string; ViolationId: string }>(BASE_URL + "user/create", {user})
}
}

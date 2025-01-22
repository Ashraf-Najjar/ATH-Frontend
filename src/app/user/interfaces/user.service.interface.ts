import { Observable } from "rxjs";
import { IUser } from "./user.interface";
import { IFilterOutput } from "src/app/shared/filter/filter.component";

export interface IUserService {
    getUsers(skip: number, limit: number, filters: IFilterOutput[], dataShape?:any): Observable<{ users: IUser[] }>;

    getUser(id: string): Observable<IUser>;

    createUser(user: IUser): any;

    updateUser(id: string, user: IUser): any;

    deleteUser(id: string): any;

    enableUser(id: string): any;

    disableUser(id: string): any;
  }
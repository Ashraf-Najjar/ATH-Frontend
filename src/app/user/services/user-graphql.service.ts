import { Injectable } from '@angular/core';
import { IUserService } from '../interfaces/user.service.interface';
import { map, Observable } from 'rxjs';
import { IUser } from '../interfaces/user.interface';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class UserGraphQLService implements IUserService {

  private getUsersQuery = gql`
  query {
    users {
      id
      name
      email
    }
  }
`;

private getUserQuery = gql`
query getUser($id: String!) {
  user(id: $id) {
    id
    name
    email
  }
}
`;

  constructor(private apollo: Apollo) { }

  getUsers(skip: number, limit: number): Observable<IUser[]> {
    return this.apollo.query<{ users: IUser[] }>({ query: this.getUsersQuery })
    .pipe(map(result => result.data.users));
  }

  getUser(id: string): Observable<IUser> {
    return this.apollo.query<{ user: IUser }>({
      query: this.getUserQuery,
      variables: { id }
    }).pipe(map(result => result.data.user));
  }
  createUser(user: IUser) {
    throw new Error('Method not implemented.');
  }
  updateUser(id: string, user: IUser) {
    throw new Error('Method not implemented.');
  }
  deleteUser(id: string) {
    throw new Error('Method not implemented.');
  }
  enableUser(id: string) {
    throw new Error('Method not implemented.');
  }
  disableUser(id: string) {
    throw new Error('Method not implemented.');
  }
}

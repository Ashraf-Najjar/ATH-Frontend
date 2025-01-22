import { Injectable } from '@angular/core';
import { IUserService } from '../interfaces/user.service.interface';
import { map, Observable } from 'rxjs';
import { IUser } from '../interfaces/user.interface';
import { Apollo, gql } from 'apollo-angular';
import USER_DATA_SHAPE from "../data-shape/user-data-shape"
import { IFilterOutput } from 'src/app/shared/filter/filter.component';

const CREATE_USER_MUTATION = gql`
  mutation CreateUser($user: CreateUserInput) {
    createUser(user: $user) {
      _id
      email
    }
  }
`;

const UPDATE_USER_MUTATION = gql`
  mutation updateUser($id: ID, $user: UpdateUserInput) {
    updateUser(id: $id, user: $user) {
      _id
      email
    }
  }
`;

const DELETE_USER_MUTATION = gql`
  mutation deleteUser($id: ID) {
    deleteUser(id: $id) {
      _id
      email
    }
  }
`;

const ENABLE_USER_MUTATION = gql`
  mutation enableUser($id: ID) {
    enableUser(id: $id) {
      _id
      email
    }
  }
`;

const DISABLE_USER_MUTATION = gql`
  mutation disableUser($id: ID) {
    disableUser(id: $id) {
      _id
      email
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class UserGraphQLService implements IUserService {

  private getUsersQuery = (dataShape: string = USER_DATA_SHAPE) => gql`
    query users($skip: Int, $limit: Int, $filters: [FilterInput]) {
      users (skip: $skip, limit: $limit, filters: $filters) {
        ${dataShape}
      }
    }
`;

  private getUserQuery = (dataShape: string = USER_DATA_SHAPE) => gql`
    query getUser($id: ID!) {
      user(id: $id) {
        ${dataShape}}
    }
`;

  constructor(private apollo: Apollo) { }

  getUsers(skip: number, limit: number, filters:IFilterOutput[], dataShape: string = USER_DATA_SHAPE): Observable<{ users: IUser[] }> {
    return this.apollo.query<{ users: IUser[] }>({ 
      query: this.getUsersQuery(dataShape) ,
      variables: {
        skip: skip,
        limit: limit,
        filters: filters,
      }
    })
      .pipe(map(result => result.data));
  }

  getUser(id: string, dataShape: string = USER_DATA_SHAPE): Observable<IUser> {
    return this.apollo.query<{ user: IUser }>({
      query: this.getUserQuery(dataShape),
      variables: { id }
    }).pipe(map(result => result.data.user));
  }

  createUser(user: IUser) {
    return this.apollo.mutate<{ user: IUser }>({
      mutation: CREATE_USER_MUTATION,
      variables: {
        user: user
      }
    }).pipe(
      map(result => result?.data)
    );
  }
  updateUser(id: string, user: IUser) {
    return this.apollo.mutate<{ user: IUser }>({
      mutation: UPDATE_USER_MUTATION,
      variables: {
        id: id,
        user: user
      }
    }).pipe(
      map(result => result?.data)
    );
  }

  deleteUser(id: string) {
    return this.apollo.mutate<{ user: IUser }>({
      mutation: DELETE_USER_MUTATION,
      variables: {
        id: id
      }
    }).pipe(
      map(result => result?.data)
    );
  }
  enableUser(id: string) {
    return this.apollo.mutate<{ user: IUser }>({
      mutation: ENABLE_USER_MUTATION,
      variables: {
        id: id
      }
    }).pipe(
      map(result => result?.data)
    );
  }
  disableUser(id: string) {
    return this.apollo.mutate<{ user: IUser }>({
      mutation: DISABLE_USER_MUTATION,
      variables: {
        id: id
      }
    }).pipe(
      map(result => result?.data)
    );
  }
}

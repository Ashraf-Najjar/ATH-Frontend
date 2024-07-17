import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { ICategory } from '../interfaces/category.interface';
import { map, Observable } from 'rxjs';
import CATEGORY_DATA_SHAPE from "../data-shape/category-data-shape";
import { ICategoryService } from '../interfaces/category-service.interface';

const CREATE_CATEGORY_MUTATION = gql`
  mutation CreateCategory($category: CreateCategoryInput) {
    createCategory(category: $category) {
      _id
      name
    }
  }
`;

const UPDATE_CATEGORY_MUTATION = gql`
  mutation updateCategory($id: ID, $category: UpdateCategoryInput) {
    updateCategory(id: $id, category: $category) {
      _id
      name
    }
  }
`;

const DELETE_CATEGORY_MUTATION = gql`
  mutation deleteCategory($id: ID) {
    deleteCategory(id: $id) {
      _id
      name
    }
  }
`;

const ENABLE_CATEGORY_MUTATION = gql`
  mutation enableCategory($id: ID) {
    enableCategory(id: $id) {
      _id
      name
    }
  }
`;

const DISABLE_CATEGORY_MUTATION = gql`
  mutation disableCategory($id: ID) {
    disableCategory(id: $id) {
      _id
      name
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class CategoryGraphQLService implements ICategoryService {


  private getCategoriesQuery = (dataShape: string = CATEGORY_DATA_SHAPE) => gql`
    query {
      categories {
        ${dataShape}
      }
    }
`;

  private getCategoryQuery = (dataShape: string = CATEGORY_DATA_SHAPE) => gql`
    query getCategory($id: ID!) {
      category(id: $id) {
        ${dataShape}}
    }
`;

  constructor(private apollo: Apollo) { }

  getCategories(skip: number, limit: number, dataShape: string = CATEGORY_DATA_SHAPE): Observable<{ categories: ICategory[] }> {
    return this.apollo.query<{ categories: ICategory[] }>({ query: this.getCategoriesQuery(dataShape) })
      .pipe(map(result => result.data));
  }

  getCategory(id: string, dataShape: string = CATEGORY_DATA_SHAPE): Observable<ICategory> {
    return this.apollo.query<{ category: ICategory }>({
      query: this.getCategoryQuery(dataShape),
      variables: { id }
    }).pipe(map(result => result.data.category));
  }

  createCategory(category: ICategory) {
    return this.apollo.mutate<{ category: ICategory }>({
      mutation: CREATE_CATEGORY_MUTATION,
      variables: {
        category: category
      }
    }).pipe(
      map(result => result?.data)
    );
  }
  updateCategory(id: string, category: ICategory) {
    return this.apollo.mutate<{ category: ICategory }>({
      mutation: UPDATE_CATEGORY_MUTATION,
      variables: {
        id: id,
        category: category
      }
    }).pipe(
      map(result => result?.data)
    );
  }

  deleteCategory(id: string) {
    return this.apollo.mutate<{ category: ICategory }>({
      mutation: DELETE_CATEGORY_MUTATION,
      variables: {
        id: id
      }
    }).pipe(
      map(result => result?.data)
    );
  }
  enableCategory(id: string) {
    return this.apollo.mutate<{ category: ICategory }>({
      mutation: ENABLE_CATEGORY_MUTATION,
      variables: {
        id: id
      }
    }).pipe(
      map(result => result?.data)
    );
  }
  disableCategory(id: string) {
    return this.apollo.mutate<{ category: ICategory }>({
      mutation: DISABLE_CATEGORY_MUTATION,
      variables: {
        id: id
      }
    }).pipe(
      map(result => result?.data)
    );
  }
}

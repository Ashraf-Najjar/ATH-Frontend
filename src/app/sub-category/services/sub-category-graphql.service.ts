import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { ISubCategory } from '../interfaces/sub-category.interface';
import { map, Observable } from 'rxjs';
import CATEGORY_DATA_SHAPE from "../data-shape/sub-category-data-shape";
import { ISubCategoryService } from '../interfaces/sub-category-service.interface';
import { IFilterOutput } from 'src/app/shared/filter/filter.component';

const CREATE_CATEGORY_MUTATION = gql`
  mutation CreateSubCategory($category: CreateSubCategoryInput) {
    createSubCategory(category: $category) {
      _id
      name
    }
  }
`;

const UPDATE_CATEGORY_MUTATION = gql`
  mutation updateSubCategory($id: ID, $category: UpdateSubCategoryInput) {
    updateSubCategory(id: $id, category: $category) {
      _id
      name
    }
  }
`;

const DELETE_CATEGORY_MUTATION = gql`
  mutation deleteSubCategory($id: ID) {
    deleteSubCategory(id: $id) {
      _id
      name
    }
  }
`;

const ENABLE_CATEGORY_MUTATION = gql`
  mutation enableSubCategory($id: ID) {
    enableSubCategory(id: $id) {
      _id
      name
    }
  }
`;

const DISABLE_CATEGORY_MUTATION = gql`
  mutation disableSubCategory($id: ID) {
    disableSubCategory(id: $id) {
      _id
      name
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class SubCategoryGraphQLService implements ISubCategoryService {


  private getSubCategoriesQuery = (dataShape: string = CATEGORY_DATA_SHAPE) => gql`
    query categories($skip: Int, $limit: Int, $filters: [FilterInput]){
      categories (skip: $skip, limit: $limit, filters: $filters) {
        ${dataShape}
      }
    }
`;

  private getSubCategoryQuery = (dataShape: string = CATEGORY_DATA_SHAPE) => gql`
    query getSubCategory($id: ID!) {
      category(id: $id) {
        ${dataShape}}
    }
`;

  constructor(private apollo: Apollo) { }

  getSubCategories(skip: number, limit: number, filters:IFilterOutput[], dataShape: string = CATEGORY_DATA_SHAPE): Observable<{ subCategories: ISubCategory[] }> {
    return this.apollo.query<{ subCategories: ISubCategory[] }>({
      query: this.getSubCategoriesQuery(dataShape),
      variables: {
        skip: skip,
        limit: limit,
        filters: filters,
      }
    })
      .pipe(map(result => result.data));
  }

  getSubCategory(id: string, dataShape: string = CATEGORY_DATA_SHAPE): Observable<ISubCategory> {
    return this.apollo.query<{ category: ISubCategory }>({
      query: this.getSubCategoryQuery(dataShape),
      variables: { id }
    }).pipe(map(result => result.data.category));
  }

  createSubCategory(category: ISubCategory) {
    return this.apollo.mutate<{ category: ISubCategory }>({
      mutation: CREATE_CATEGORY_MUTATION,
      variables: {
        category: category
      }
    }).pipe(
      map(result => result?.data)
    );
  }
  updateSubCategory(id: string, category: ISubCategory) {
    return this.apollo.mutate<{ category: ISubCategory }>({
      mutation: UPDATE_CATEGORY_MUTATION,
      variables: {
        id: id,
        category: category
      }
    }).pipe(
      map(result => result?.data)
    );
  }

  deleteSubCategory(id: string) {
    return this.apollo.mutate<{ category: ISubCategory }>({
      mutation: DELETE_CATEGORY_MUTATION,
      variables: {
        id: id
      }
    }).pipe(
      map(result => result?.data)
    );
  }
  enableSubCategory(id: string) {
    return this.apollo.mutate<{ category: ISubCategory }>({
      mutation: ENABLE_CATEGORY_MUTATION,
      variables: {
        id: id
      }
    }).pipe(
      map(result => result?.data)
    );
  }
  disableSubCategory(id: string) {
    return this.apollo.mutate<{ category: ISubCategory }>({
      mutation: DISABLE_CATEGORY_MUTATION,
      variables: {
        id: id
      }
    }).pipe(
      map(result => result?.data)
    );
  }
}

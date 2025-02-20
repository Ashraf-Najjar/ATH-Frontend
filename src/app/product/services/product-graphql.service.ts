import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IProduct } from '../interfaces/product.interface';
import { Apollo, gql } from 'apollo-angular';
import PRODUCT_DATA_SHAPE from "../data-shape/product-data-shape"
import { IFilterOutput } from 'src/app/shared/filter/filter.component';

const CREATE_PRODUCT_MUTATION = gql`
  mutation CreateProduct($product: CreateProductInput) {
    createProduct(product: $product) {
      _id
      name
    }
  }
`;

const UPDATE_PRODUCT_MUTATION = gql`
  mutation updateProduct($id: ID, $product: UpdateProductInput) {
    updateProduct(id: $id, product: $product) {
      _id
      name
    }
  }
`;

const DELETE_PRODUCT_MUTATION = gql`
  mutation deleteProduct($id: ID) {
    deleteProduct(id: $id) {
      _id
      name
    }
  }
`;

const ENABLE_PRODUCT_MUTATION = gql`
  mutation enableProduct($id: ID) {
    enableProduct(id: $id) {
      _id
      name
    }
  }
`;

const DISABLE_PRODUCT_MUTATION = gql`
  mutation disableProduct($id: ID) {
    disableProduct(id: $id) {
      _id
      name
    }
  }
`;


@Injectable({
  providedIn: 'root'
})
export class ProductGraphQLService {

  private getProductsQuery = (dataShape: string = PRODUCT_DATA_SHAPE) => gql`
    query products($skip: Int, $limit: Int, $filters: [FilterInput]) {
      products (skip: $skip, limit: $limit, filters: $filters) {
        ${dataShape}
      }
    }
`;

  private getProductQuery = (dataShape: string = PRODUCT_DATA_SHAPE) => gql`
    query getProduct($id: ID!) {
      product(id: $id) {
        ${dataShape}}
    }
`;

  constructor(private apollo: Apollo) { }

  getProducts(skip: number, limit: number, filters:IFilterOutput[], dataShape: string = PRODUCT_DATA_SHAPE): Observable<{ products: IProduct[] }> {
    return this.apollo.query<{ products: IProduct[] }>({ 
      query: this.getProductsQuery(dataShape) ,
      variables: {
        skip: skip,
        limit: limit,
        filters: filters,
      }
    })
      .pipe(map(result => result.data));
  }

  getProduct(id: string, dataShape: string = PRODUCT_DATA_SHAPE): Observable<IProduct> {
    return this.apollo.query<{ product: IProduct }>({
      query: this.getProductQuery(dataShape),
      variables: { id }
    }).pipe(map(result => result.data.product));
  }

  createProduct(product: IProduct) {
    return this.apollo.mutate<{ product: IProduct }>({
      mutation: CREATE_PRODUCT_MUTATION,
      variables: {
        product: product
      }
    }).pipe(
      map(result => result?.data)
    );
  }
  updateProduct(id: string, product: IProduct) {
    return this.apollo.mutate<{ product: IProduct }>({
      mutation: UPDATE_PRODUCT_MUTATION,
      variables: {
        id: id,
        product: product
      }
    }).pipe(
      map(result => result?.data)
    );
  }

  deleteProduct(id: string) {
    return this.apollo.mutate<{ product: IProduct }>({
      mutation: DELETE_PRODUCT_MUTATION,
      variables: {
        id: id
      }
    }).pipe(
      map(result => result?.data)
    );
  }
  enableProduct(id: string) {
    return this.apollo.mutate<{ product: IProduct }>({
      mutation: ENABLE_PRODUCT_MUTATION,
      variables: {
        id: id
      }
    }).pipe(
      map(result => result?.data)
    );
  }
  disableProduct(id: string) {
    return this.apollo.mutate<{ product: IProduct }>({
      mutation: DISABLE_PRODUCT_MUTATION,
      variables: {
        id: id
      }
    }).pipe(
      map(result => result?.data)
    );
  }
}

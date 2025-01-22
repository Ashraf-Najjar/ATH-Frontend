import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct } from '../interfaces/product.interface';
import { environment } from 'src/environments/environment';
import { IProductService } from '../interfaces/product-service.interface';
import { IFilterOutput } from 'src/app/shared/filter/filter.component';

const BASE_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ProductRestService {
  constructor(private http: HttpClient) { }

  getProducts(skip: number, limit: number, filters: IFilterOutput[]): Observable<{ products: IProduct[] }> {
    const params = {
      skip, limit, filters: JSON.stringify(filters)
    }
    const url = `${BASE_URL}product/list`;
    return this.http.get<{ products: IProduct[] }>(url, {
      params: params
    });
  }

  getProduct(id: string): Observable<IProduct> {
    // const queryParams = `?id=${id}`;
    const url = `${BASE_URL}product/${id}`;
    return this.http.get<IProduct>(url);
  }

  createProduct(product: IProduct) {
    return this.http.post<{ message: string}>(BASE_URL + "product/create", { product })
  }

  updateProduct(id: string, product: IProduct) {
    return this.http.post<{ message: string}>(BASE_URL + "product/update", { id,product })
  }

  deleteProduct(id: string) {
    return this.http.post<{ message: string}>(BASE_URL + "product/delete", { id });
  }

  enableProduct(id: string) {
    return this.http.post<{ message: string}>(BASE_URL + "product/enable", { id });
  }

  disableProduct(id: string) {
    return this.http.post<{ message: string}>(BASE_URL + "product/disable", { id });
  }
}

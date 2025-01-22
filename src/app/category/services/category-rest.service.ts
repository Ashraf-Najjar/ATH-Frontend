import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICategory } from '../interfaces/category.interface';
import { ICategoryService } from '../interfaces/category-service.interface';
import { IFilterOutput } from 'src/app/shared/filter/filter.component';


const BASE_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class CategoryRestService implements ICategoryService {

  constructor(private http: HttpClient) {}

  getCategories(skip: number, limit: number, filters: IFilterOutput[] = []): Observable<{ categories: ICategory[] }> {
    const params = {
      skip, limit, filters: JSON.stringify(filters)
    }
    const url = `${BASE_URL}category/list`;
    return this.http.get<{ categories: ICategory[] }>(url, {
      params: params
    });
  }

  getCategory(id: string): Observable<ICategory> {
    const url = `${BASE_URL}category/${id}`;
    return this.http.get<ICategory>(url);
  }

  updateCategory(id: string, category: ICategory) {
    return this.http.post<{ message: string}>(BASE_URL + "category/update", { id, category });
  }

  deleteCategory(id: string) {
    return this.http.post<{ message: string}>(BASE_URL + "category/delete", { id })
  }

  enableCategory(id: string) {
    return this.http.post<{ message: string}>(BASE_URL + "category/enable", { id });
  }

  disableCategory(id: string) {
    return this.http.post<{ message: string}>(BASE_URL + "category/disable", { id });
  }



  createCategory(category: any) {
    return this.http.post<{ message: string; ViolationId: string }>(BASE_URL + "category/create", {category})
}
}

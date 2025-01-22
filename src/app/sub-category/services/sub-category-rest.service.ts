import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ISubCategory } from '../interfaces/sub-category.interface';
import { ISubCategoryService } from '../interfaces/sub-category-service.interface';
import { IFilterOutput } from 'src/app/shared/filter/filter.component';


const BASE_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class SubCategoryRestService implements ISubCategoryService {

  constructor(private http: HttpClient) {}

  getSubCategories(skip: number, limit: number, filters: IFilterOutput[]): Observable<{ subCategories: ISubCategory[] }> {
    const params = {
      skip, limit, filters: JSON.stringify(filters)
    }
    const url = `${BASE_URL}subCategory/list`;
    return this.http.get<{ subCategories: ISubCategory[] }>(url, {
      params: params
    });
  }

  getSubCategory(id: string): Observable<ISubCategory> {
    const url = `${BASE_URL}subCategory/${id}`;
    return this.http.get<ISubCategory>(url);
  }

  updateSubCategory(id: string, subCategory: ISubCategory) {
    return this.http.post<{ message: string}>(BASE_URL + "subCategory/update", { id, subCategory });
  }

  deleteSubCategory(id: string) {
    return this.http.post<{ message: string}>(BASE_URL + "subCategory/delete", { id })
  }

  enableSubCategory(id: string) {
    return this.http.post<{ message: string}>(BASE_URL + "subCategory/enable", { id });
  }

  disableSubCategory(id: string) {
    return this.http.post<{ message: string}>(BASE_URL + "subCategory/disable", { id });
  }



  createSubCategory(subCategory: any) {
    return this.http.post<{ message: string; ViolationId: string }>(BASE_URL + "subCategory/create", {subCategory})
}
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICategory } from '../interfaces/category.interface';


const BASE_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) {}

  getCategories(skip: number, limit: number): Observable<ICategory[]> {
    const queryParams = `?skip=${skip}&limit=${limit}`;
    const url = `${BASE_URL}category/list` + queryParams;
    return this.http.get<ICategory[]>(url);
  }

  createCategory(category: any) {
    return this.http.post<{ message: string; ViolationId: string }>(BASE_URL + "category/create", {category})
}
}

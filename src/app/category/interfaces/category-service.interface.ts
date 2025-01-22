import { Observable } from "rxjs";
import { ICategory } from "./category.interface";
import { IFilterOutput } from "src/app/shared/filter/filter.component";

export interface ICategoryService {
    getCategories(skip: number, limit: number, filters?: IFilterOutput[], dataShape?:any): Observable<{ categories: ICategory[] }>;

    getCategory(id: string): Observable<ICategory>;

    createCategory(category: ICategory): any;

    updateCategory(id: string, category: ICategory): any;

    deleteCategory(id: string): any;

    enableCategory(id: string): any;

    disableCategory(id: string): any;
  }
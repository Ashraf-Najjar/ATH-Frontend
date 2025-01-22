import { Observable } from "rxjs";
import { ISubCategory } from "./sub-category.interface";
import { IFilterOutput } from "src/app/shared/filter/filter.component";

export interface ISubCategoryService {
    getSubCategories(skip: number, limit: number, filters: IFilterOutput[], dataShape?:any): Observable<{ subCategories: ISubCategory[] }>;

    getSubCategory(id: string): Observable<ISubCategory>;

    createSubCategory(category: ISubCategory): any;

    updateSubCategory(id: string, category: ISubCategory): any;

    deleteSubCategory(id: string): any;

    enableSubCategory(id: string): any;

    disableSubCategory(id: string): any;
  }

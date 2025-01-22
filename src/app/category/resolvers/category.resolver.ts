import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { ActivatedRouteSnapshot } from "@angular/router";
import { Observable, Subject } from "rxjs";
import { takeUntil } from 'rxjs/operators';
import { CategoryFactoryService } from "../services/category-factory.service";
import { ICategoryService } from "../interfaces/category-service.interface";

@Injectable()
export class CategoryResolver implements Resolve<any> {
  private _unsubscribeAll: Subject<any>;
  categoryService: ICategoryService = this.categoryFactoryService.getCategoryService();
  constructor(private categoryFactoryService: CategoryFactoryService) {
    this._unsubscribeAll = new Subject();
  }

  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
    return new Promise(async (resolve, reject) => {
      const id = route.params['id'];
      this.categoryService.getCategory(id).pipe(takeUntil(this._unsubscribeAll)).subscribe(
        async (result: any) => {
          resolve(result.category ?? result)
        }
      );
    });
  }
}

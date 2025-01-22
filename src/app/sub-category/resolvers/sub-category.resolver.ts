import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { ActivatedRouteSnapshot } from "@angular/router";
import { Observable, Subject } from "rxjs";
import { takeUntil } from 'rxjs/operators';
import { SubCategoryFactoryService } from "../services/sub-category-factory.service";
import { ISubCategoryService } from "../interfaces/sub-category-service.interface";

@Injectable()
export class SubCategoryResolver implements Resolve<any> {
  private _unsubscribeAll: Subject<any>;
  subCategoryService: ISubCategoryService = this.subCategoryFactoryService.getSubCategoryService();
  constructor(private subCategoryFactoryService: SubCategoryFactoryService) {
    this._unsubscribeAll = new Subject();
  }

  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
    return new Promise(async (resolve, reject) => {
      const id = route.params['id'];
      this.subCategoryService.getSubCategory(id).pipe(takeUntil(this._unsubscribeAll)).subscribe(
        async (result: any) => {
          resolve(result.subCategory ?? result)
        }
      );
    });
  }
}

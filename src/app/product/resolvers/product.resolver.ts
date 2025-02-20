import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { ActivatedRouteSnapshot } from "@angular/router";
import { Observable, Subject } from "rxjs";
import { takeUntil } from 'rxjs/operators';
import { IProductService } from "../interfaces/product-service.interface";
import { ProductFactoryService } from "../services/product-factory.service";

@Injectable()
export class ProductResolver implements Resolve<any> {
  private _unsubscribeAll: Subject<any>;
  productService: IProductService = this.productFactoryService.getProductService();
  constructor(private productFactoryService: ProductFactoryService) {
    this._unsubscribeAll = new Subject();
  }

  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
    return new Promise(async (resolve, reject) => {
      const id = route.params['id'];
      this.productService.getProduct(id).pipe(takeUntil(this._unsubscribeAll)).subscribe(
        async (result: any) => {
          console.log('result ', result)
          resolve(result.product ?? result)
        }
      );
    });
  }
}


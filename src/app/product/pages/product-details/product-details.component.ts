import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { IProduct } from '../../interfaces/product.interface';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {
  unSubscribeAll = new Subject<void>();
  product!: IProduct;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
  ) {
    this.activeRoute.data.pipe(takeUntil(this.unSubscribeAll)).subscribe({
      next: (res: { [key: string]: Data }) => {
        if (!res) {
          this.handleNavigate();
          return;
        }
        this.product = <IProduct>res?.['product'];
      }
    })
  }

  handleNavigate() {
    this.router.navigate(["/product/list"]);
  }

  ngOnDestroy() {
    this.unSubscribeAll.next();
    this.unSubscribeAll.complete();
  }
}

import { Component, computed, OnInit, signal } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ITableConfig } from 'src/app/shared/table/table.component';
import { tableConfig } from '../../config/product-table.config';
import { filterConfig } from '../../config/product-filter.config';
import { IFilter, IFilterOutput } from 'src/app/shared/filter/filter.component';
import { IProductService } from '../../interfaces/product-service.interface';
import { ProductFactoryService } from '../../services/product-factory.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { AuthService } from 'src/app/auth/services/auth.service';
import { IUser } from 'src/app/user/interfaces/user.interface';
import { EUserType } from 'src/app/core/enums/EUserType';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  dataSource: any = [];
  subscriber = new Subject();
  config: ITableConfig = tableConfig(this);
  filters: IFilter[] = filterConfig(this)

  // Pagination Config
  rpp = 20;
  page = 0;
  dataSize!: number;
  pageSizeOptions = [2, 5, 10, 25];
  appliedFilters: IFilterOutput[] = [];

  isLoading = false;

  productService: IProductService = this.productFactoryService.getProductService();

  user = signal<IUser | undefined>(this.authService.getUser());
  canCreateProduct = computed(() => this.user()?.role?.toUpperCase() === EUserType.User);

  constructor(
    public productFactoryService: ProductFactoryService,
    public router: Router,
    public dialog: MatDialog,
    private authService: AuthService
  ) { }


  ngOnInit(): void {
    this.load();
  }

  onChangedPage(event: PageEvent) {
    this.page = event.pageIndex;
    this.rpp = event.pageSize;
    this.load();

  }

  load() {
    this.isLoading = true;
    this.productService.getProducts(this.page, this.rpp, this.appliedFilters).pipe(takeUntil(this.subscriber)).subscribe((result: any) => {
      this.dataSource = result.products
      this.dataSize = result.count;
      this.isLoading = false;
    })
  }

  filtersChanged(filters: IFilterOutput[]){
    this.appliedFilters = filters;
    this.load();
  }

  navigateToCreate() {
    this.router.navigate(['product/create'])
  }

}

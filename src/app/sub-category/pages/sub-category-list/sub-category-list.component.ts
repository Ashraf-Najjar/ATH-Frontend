import { Component } from '@angular/core';
import { SubCategoryRestService } from '../../services/sub-category-rest.service';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { tableConfig } from '../../config/sub-category-table.config';
import { SubCategoryFactoryService } from '../../services/sub-category-factory.service';
import { ISubCategoryService } from '../../interfaces/sub-category-service.interface';
import { ITableConfig } from 'src/app/shared/table/table.component';
import { IFilter, IFilterOutput } from 'src/app/shared/filter/filter.component';
import { filterConfig } from '../../config/sub-category-filter.config';

@Component({
  selector: 'app-sub-category-list',
  templateUrl: './sub-category-list.component.html',
  styleUrls: ['./sub-category-list.component.scss']
})
export class SubCategoryListComponent {
  dataSource: any = [];
  subscriber = new Subject();
  config: ITableConfig = tableConfig(this);
  filters: IFilter[] = filterConfig(this);
  appliedFilters: IFilterOutput[] = [];

  // Pagination Config
  rpp = 20;
  page = 0;
  dataSize!: number;
  pageSizeOptions = [2, 5, 10, 25];

  isLoading = false;

  subCategoryService: ISubCategoryService = this.categoryFactoryService.getSubCategoryService();

  constructor(
    public categoryFactoryService: SubCategoryFactoryService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.load();
  }

  onChangedPage(event: any) {
    this.page = event.pageIndex;
    this.rpp = event.pageSize;
    this.load();

  }

  load() {
    this.isLoading = true;
    this.subCategoryService.getSubCategories(this.page, this.rpp, this.appliedFilters).pipe(takeUntil(this.subscriber)).subscribe((result: any) => {
      this.dataSource = result.subCategories
      this.dataSize = result.count;
      this.isLoading = false;
    })
  }

  filtersChanged(filters: IFilterOutput[]){
    this.appliedFilters = filters;
    this.load();
  }


  navigateToCreate() {
    this.router.navigate(['sub-category/create'])
  }
}

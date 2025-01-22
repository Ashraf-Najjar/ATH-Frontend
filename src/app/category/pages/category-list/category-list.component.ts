import { Component } from '@angular/core';
import { CategoryRestService } from '../../services/category-rest.service';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { tableConfig } from '../../config/category-table.config';
import { CategoryFactoryService } from '../../services/category-factory.service';
import { ICategoryService } from '../../interfaces/category-service.interface';
import { ITableConfig } from 'src/app/shared/table/table.component';
import { IFilter, IFilterOutput } from 'src/app/shared/filter/filter.component';
import { filterConfig } from '../../config/category-filter.config';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent {
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

  categoryService: ICategoryService = this.categoryFactoryService.getCategoryService();

  constructor(
    public categoryFactoryService: CategoryFactoryService,
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
    this.categoryService.getCategories(this.page, this.rpp, this.appliedFilters).pipe(takeUntil(this.subscriber)).subscribe((result: any) => {
      this.dataSource = result.categories
      this.dataSize = result.count;
      this.isLoading = false;
    })
  }
  
  filtersChanged(filters: IFilterOutput[]){
    this.appliedFilters = filters;
    this.load();
  }


  navigateToCreate() {
    this.router.navigate(['category/create'])
  }
}

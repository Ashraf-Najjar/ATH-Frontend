import { Component } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { tableConfig } from '../../config/table.config';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent {
  dataSource: any = [];
  subscriber = new Subject();
  config = tableConfig;

  // Pagination Config
  rpp = 20;
  page = 0;
  dataSize!: number;
  pageSizeOptions = [2, 5, 10, 25];

  isLoading = false;

  constructor(
    private categoryService: CategoryService,
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
    this.categoryService.getCategories(this.page, this.rpp).pipe(takeUntil(this.subscriber)).subscribe((result: any) => {
      this.dataSource = result.categories
      this.dataSize = result.count;
      this.isLoading = false;
    })
  }

  navigateToCreate() {
    this.router.navigate(['category/create'])
  }
}

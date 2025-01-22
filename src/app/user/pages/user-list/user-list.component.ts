import { Component, OnInit, ViewChild } from '@angular/core';
import { UserRestService } from '../../services/user-rest.service';
import { Subject, takeUntil } from 'rxjs';
import { tableConfig } from '../../config/user-table.config';
import { Router } from '@angular/router';
import { ITableConfig } from 'src/app/shared/table/table.component';
import { IUserService } from '../../interfaces/user.service.interface';
import { UserFactoryService } from '../../services/user-factory.service';
import { FilterComponent, IFilter, IFilterOutput } from 'src/app/shared/filter/filter.component';
import { filterConfig } from '../../config/user-filter.config';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
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

  userService: IUserService = this.userFactoryService.getUserService();

  constructor(
    public userFactoryService: UserFactoryService,
    public router: Router,
    public dialog: MatDialog
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
    this.userService.getUsers(this.page, this.rpp, this.appliedFilters).pipe(takeUntil(this.subscriber)).subscribe((result: any) => {
      this.dataSource = result.users
      this.dataSize = result.count;
      this.isLoading = false;
    })
  }

  filtersChanged(filters: IFilterOutput[]){
    this.appliedFilters = filters;
    this.load();
  }

  navigateToCreate() {
    this.router.navigate(['user/create'])
  }

}

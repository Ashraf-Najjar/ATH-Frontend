import { Component, OnInit } from '@angular/core';
import { UserRestService } from '../../services/user-rest.service';
import { Subject, takeUntil } from 'rxjs';
import { tableConfig } from '../../config/user-table.config';
import { Router } from '@angular/router';
import { ITableConfig } from 'src/app/shared/table/table.component';
import { IUserService } from '../../interfaces/user.service.interface';
import { UserFactoryService } from '../../services/user-factory.service';
import { IFilter } from 'src/app/shared/filter/filter.component';
import { filterConfig } from '../../config/user-filter.config';


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

  isLoading = false;

  userService: IUserService = this.userFactoryService.getUserService();

  constructor(
    public userFactoryService: UserFactoryService,
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
    this.userService.getUsers(this.page, this.rpp).pipe(takeUntil(this.subscriber)).subscribe((result: any) => {
      this.dataSource = result.users
      this.dataSize = result.count;
      this.isLoading = false;
    })
  }

  navigateToCreate() {
    this.router.navigate(['user/create'])
  }

}

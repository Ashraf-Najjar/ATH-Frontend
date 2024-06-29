import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Subject, takeUntil } from 'rxjs';
import { tableConfig } from '../../config/table.config';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
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
    private userService: UserService,
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

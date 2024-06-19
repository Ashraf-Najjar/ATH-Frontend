import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Subject, takeUntil } from 'rxjs';
import { tableConfig } from '../config/table.config';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  dataSource:any = [];
  subscriber =  new Subject();
  config = tableConfig;

  constructor(private userService: UserService){

  }

  ngOnInit(): void {
    console.log("here we go")
    this.userService.getUsers(0,100).pipe(takeUntil(this.subscriber)).subscribe((result: any) => {
      console.log('result -> ', result.users )
      this.dataSource = result.users
    })
  }

}

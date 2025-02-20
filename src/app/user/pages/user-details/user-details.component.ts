import { Component, OnDestroy, OnInit } from '@angular/core';
import { IUser } from '../../interfaces/user.interface';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { IUserService } from '../../interfaces/user.service.interface';
import { UserFactoryService } from '../../services/user-factory.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  user!: IUser;
  unSubscribeAll = new Subject<void>();

  userService: IUserService = this.userFactoryService.getUserService();

  constructor(
    public userFactoryService: UserFactoryService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activeRoute.data.pipe(takeUntil(this.unSubscribeAll)).subscribe({
      next: (res: { [key: string]: Data }) => {
        if (!res) {
          this.handleNavigate();
          return;
        }
        this.user = <IUser>res?.['user'];

      }
    })
  }

  editProfile() {
    this.router.navigate(["/user/edit", this.user._id]);
  }

  enableUser() {
    this.user.enabled = true;
    this.userService.enableUser(this.user._id).subscribe((res: any) => { });
  }

  disableUser() {
    this.user.enabled = false;
    this.userService.disableUser(this.user._id).subscribe((res: any) => { });
  }

  handleNavigate() {
    this.router.navigate(["/user/list"]);
  }

  ngOnDestroy(): void {
    this.unSubscribeAll.next();
    this.unSubscribeAll.complete();
  }
}

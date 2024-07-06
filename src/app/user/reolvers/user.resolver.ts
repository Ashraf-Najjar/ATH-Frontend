import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { ActivatedRouteSnapshot } from "@angular/router";
import { Observable, Subject } from "rxjs";
import { takeUntil } from 'rxjs/operators';
import { UserRestService } from "../services/user-rest.service";
import { UserFactoryService } from "../services/user-factory.service";
import { IUserService } from "../interfaces/user.service.interface";

@Injectable()
export class UserResolver implements Resolve<any> {
  private _unsubscribeAll: Subject<any>;
  userService: IUserService = this.userFactoryService.getUserService();
  constructor(private userFactoryService: UserFactoryService) {
    this._unsubscribeAll = new Subject();
  }

  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
    return new Promise(async (resolve, reject) => {
      const id = route.params['id'];
      this.userService.getUser(id).pipe(takeUntil(this._unsubscribeAll)).subscribe(
        async (result: any) => {
          resolve(result)
        }
      );
    });
  }
}

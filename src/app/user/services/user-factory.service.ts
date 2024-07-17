import { Injectable } from '@angular/core';
import { ConfigService } from 'src/app/core/services/config.service';
import { UserRestService } from './user-rest.service';
import { UserGraphQLService } from './user-graphql.service';
import { IUserService } from '../interfaces/user.service.interface';

@Injectable({
  providedIn: 'root'
})
export class UserFactoryService {

  constructor(
    private configService: ConfigService,
    private userRestService: UserRestService,
    private userGraphQLService: UserGraphQLService
  ) { }

  getUserService(): IUserService {
    return this.configService.getUserGraphQL() ? <UserGraphQLService>this.userGraphQLService : <UserRestService>this.userRestService;
  }
}

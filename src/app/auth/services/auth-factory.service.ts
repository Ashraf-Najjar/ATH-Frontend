import { Injectable } from '@angular/core';
import { ConfigService } from 'src/app/core/services/config.service';
import { AuthRestService } from './auth-rest.service';
import { AuthGraphQLService } from './auth-graphql.service';
import { IAuthService } from '../interfaces/auth.service.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthFactoryService {

  constructor(
    private configService: ConfigService,
    private authRestService: AuthRestService,
    private authGraphQLService: AuthGraphQLService
  ) { }

  getAuthService(): IAuthService {
    // return this.configService.getUserGraphQL() ? <AuthGraphQLService>this.authGraphQLService : <AuthRestService>this.authRestService;
    return  <AuthRestService>this.authRestService;
  }
}

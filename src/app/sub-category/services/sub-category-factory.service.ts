import { Injectable } from '@angular/core';
import { ConfigService } from 'src/app/core/services/config.service';
import { SubCategoryRestService } from './sub-category-rest.service';
import { SubCategoryGraphQLService } from './sub-category-graphql.service';
import { ISubCategoryService } from '../interfaces/sub-category-service.interface';

@Injectable({
  providedIn: 'root'
})
export class SubCategoryFactoryService {

  constructor(
    private configService: ConfigService,
    private subCategoryRestService: SubCategoryRestService,
    private subCategoryGraphQLService: SubCategoryGraphQLService
  ) { }

  getSubCategoryService(): ISubCategoryService {
    return this.configService.getSubCategoryGraphQL() ? <SubCategoryGraphQLService>this.subCategoryGraphQLService : <SubCategoryRestService>this.subCategoryRestService;
  }
}

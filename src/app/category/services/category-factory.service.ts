import { Injectable } from '@angular/core';
import { ConfigService } from 'src/app/core/services/config.service';
import { CategoryRestService } from './category-rest.service';
import { CategoryGraphQLService } from './category-graphql.service';
import { ICategoryService } from '../interfaces/category-service.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryFactoryService {

  constructor(
    private configService: ConfigService,
    private categoryRestService: CategoryRestService,
    private categoryGraphQLService: CategoryGraphQLService
  ) { }

  getCategoryService(): ICategoryService {
    return this.configService.getCategoryGraphQL() ? <CategoryGraphQLService>this.categoryGraphQLService : <CategoryRestService>this.categoryRestService;
  }
}

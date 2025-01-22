import { Injectable } from '@angular/core';
import { ConfigService } from 'src/app/core/services/config.service';
import { ProductRestService } from './product-rest.service';
import { ProductGraphQLService } from './product-graphql.service';
import { IProductService } from '../interfaces/product-service.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductFactoryService {

  constructor(
    private configService: ConfigService,
    private productRestService: ProductRestService,
    private productGraphQLService: ProductGraphQLService
  ) { }

  getProductService(): IProductService {
    return this.configService.getProductGraphQL() ? <ProductGraphQLService>this.productGraphQLService : <ProductRestService>this.productRestService;
  }
  
}

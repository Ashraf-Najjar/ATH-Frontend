import { Observable } from "rxjs";
import { IProduct } from "./product.interface";
import { IFilterOutput } from "src/app/shared/filter/filter.component";

export interface IProductService {
    getProducts(skip: number, limit: number, filters: IFilterOutput[], dataShape?:any): Observable<{ products: IProduct[] }>;

    getProduct(id: string): Observable<IProduct>;

    createProduct(product: IProduct): any;

    updateProduct(id: string, product: IProduct): any;

    deleteProduct(id: string): any;

    enableProduct(id: string): any;

    disableProduct(id: string): any;
  }
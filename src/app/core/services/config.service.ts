import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private userGraphQL: boolean = true;
  private categoryGraphQL: boolean = false;
  private subCategoryGraphQL: boolean = false;
  private productGraphQL: boolean = false;

  constructor() { }

  setUserGraphQL(userGraphQL: boolean) {
    this.userGraphQL = userGraphQL;
  }

  getUserGraphQL(): boolean {
    return this.userGraphQL;
  }

  setCategoryGraphQL(categoryGraphQL: boolean) {
    this.categoryGraphQL = categoryGraphQL;
  }

  getCategoryGraphQL(): boolean {
    return this.categoryGraphQL;
  }

  setSubCategoryGraphQL(subCategoryGraphQL: boolean) {
    this.subCategoryGraphQL = subCategoryGraphQL;
  }

  getSubCategoryGraphQL(): boolean {
    return this.subCategoryGraphQL;
  }

  setProductGraphQL(productGraphQL: boolean) {
    this.productGraphQL = productGraphQL;
  }

  getProductGraphQL(): boolean {
    return this.productGraphQL;
  }
}

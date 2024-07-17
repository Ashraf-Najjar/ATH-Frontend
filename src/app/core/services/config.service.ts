import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private useGraphQL: boolean = false;
  private categoryGraphQL: boolean = true;

  constructor() { }

  setUserGraphQL(useGraphQL: boolean) {
    this.useGraphQL = useGraphQL;
  }

  getUserGraphQL(): boolean {
    return this.useGraphQL;
  }

  setCategoryGraphQL(categoryGraphQL: boolean) {
    this.categoryGraphQL = categoryGraphQL;
  }

  getCategoryGraphQL(): boolean {
    return this.categoryGraphQL;
  }
}

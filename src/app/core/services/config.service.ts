import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private useGraphQL: boolean = true;

  constructor() { }

  setUseGraphQL(useGraphQL: boolean) {
    this.useGraphQL = useGraphQL;
  }

  getUseGraphQL(): boolean {
    return this.useGraphQL;
  }
}

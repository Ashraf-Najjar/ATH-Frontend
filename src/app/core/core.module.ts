import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphqlModule } from './graphql/graphql.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    GraphqlModule.on('http://localhost:4000/graphql'),
  ]
})
export class CoreModule { }

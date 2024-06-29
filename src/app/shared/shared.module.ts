import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { PageTitleComponent } from './page-title/page-title.component';
import {MatCardModule} from '@angular/material/card';


@NgModule({
  declarations: [
    TableComponent,
    PageTitleComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    RouterModule,
    MatCardModule
  ],
  exports:[
    TableComponent,
    PageTitleComponent
  ]
})
export class SharedModule { }

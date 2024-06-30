import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { PageTitleComponent } from './page-title/page-title.component';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  declarations: [
    TableComponent,
    PageTitleComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatTooltipModule,
    RouterModule,
    MatCardModule
  ],
  exports:[
    TableComponent,
    PageTitleComponent
  ]
})
export class SharedModule { }

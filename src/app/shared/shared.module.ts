import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { PageTitleComponent } from './page-title/page-title.component';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FilterComponent } from './filter/filter.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule} from '@angular/material/dialog';
import { MatMenuModule} from '@angular/material/menu';
import { SkeletonComponent } from './skeleton/skeleton.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { FileUploadComponent } from './file-upload/file-upload.component';
import {MatListModule} from '@angular/material/list';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
@NgModule({
  declarations: [
    TableComponent,
    PageTitleComponent,
    FilterComponent,
    SkeletonComponent,
    FileUploadComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatTooltipModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatMenuModule,
    NgxSkeletonLoaderModule,
    MatDialogModule,
    MatListModule,
    MatButtonModule,
    MatProgressBarModule
  ],
  exports:[
    TableComponent,
    PageTitleComponent,
    FilterComponent,
    SkeletonComponent,
    FileUploadComponent
  ]
})
export class SharedModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubCategoryListComponent } from './pages/sub-category-list/sub-category-list.component';
import { SubCategoryRoutingModule } from './sub-category-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SubCategoryFormComponent } from './pages/sub-category-form/sub-category-form.component';
import { SubCategoryResolver } from './resolvers/sub-category.resolver';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';



@NgModule({
  declarations: [
    SubCategoryListComponent,
    SubCategoryFormComponent
  ],
  imports: [
    CommonModule,
    SubCategoryRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatButtonModule,
    MatCardModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    SharedModule
  ],
  providers: [
    SubCategoryResolver
  ]
})
export class SubCategoryModule { }

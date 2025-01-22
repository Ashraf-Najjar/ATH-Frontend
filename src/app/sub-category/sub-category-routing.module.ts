import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SubCategoryListComponent } from "./pages/sub-category-list/sub-category-list.component";
import { SubCategoryFormComponent } from "./pages/sub-category-form/sub-category-form.component";
import { SubCategoryResolver } from "./resolvers/sub-category.resolver";

const routes: Routes = [
    {
      path: 'list',
      component: SubCategoryListComponent,
    },
    {
      path: 'create',
      component: SubCategoryFormComponent,
    },
    {
      path: 'edit/:id',
      component: SubCategoryFormComponent,
      resolve: {
        subCategory: SubCategoryResolver
      }
    }
  ]

  @NgModule({
      imports: [RouterModule.forChild(routes)],
      exports: [RouterModule],
      providers: []
    })
  export class SubCategoryRoutingModule{}

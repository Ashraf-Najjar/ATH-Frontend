import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CategoryListComponent } from "./pages/category-list/category-list.component";
import { CategoryFormComponent } from "./pages/category-form/category-form.component";
import { CategoryResolver } from "./resolvers/category.resolver";

const routes: Routes = [
    {
      path: 'list',
      component: CategoryListComponent,
    },
    {
      path: 'create',
      component: CategoryFormComponent,
    },
    {
      path: 'edit/:id',
      component: CategoryFormComponent,
      resolve: {
        category: CategoryResolver
      }
    }
  ]
  
  @NgModule({
      imports: [RouterModule.forChild(routes)],
      exports: [RouterModule],
      providers: []
    })
  export class CategoryRoutingModule{}
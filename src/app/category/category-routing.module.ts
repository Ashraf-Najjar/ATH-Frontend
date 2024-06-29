import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CategoryListComponent } from "./pages/category-list/category-list.component";
import { CategoryFormComponent } from "./pages/category-form/category-form.component";

const routes: Routes = [
    {
      path: 'list',
      component: CategoryListComponent,
    },
    {
      path: 'create',
      component: CategoryFormComponent,
    },
  ]
  
  @NgModule({
      imports: [RouterModule.forChild(routes)],
      exports: [RouterModule],
      providers: []
    })
  export class CategoryRoutingModule{}
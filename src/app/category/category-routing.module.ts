import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CategoryListComponent } from "./pages/category-list/category-list.component";
import { CategoryFormComponent } from "./pages/category-form/category-form.component";
import { CategoryResolver } from "./resolvers/category.resolver";
import { EUserType } from "../core/enums/EUserType";
import { authGuard } from "../core/guards/auth.guard";

const routes: Routes = [
  {
    path: 'list',
    component: CategoryListComponent,
    data: {
      allowedTypes: [EUserType.User],
    },
    canActivate: [authGuard],
  },
  {
    path: 'create',
    component: CategoryFormComponent,
    data: {
      allowedTypes: [EUserType.User],
    },
    canActivate: [authGuard],
  },
  {
    path: 'edit/:id',
    component: CategoryFormComponent,
    data: {
      allowedTypes: [EUserType.User],
    },
    canActivate: [authGuard],
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
export class CategoryRoutingModule { }
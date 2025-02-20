import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SubCategoryListComponent } from "./pages/sub-category-list/sub-category-list.component";
import { SubCategoryFormComponent } from "./pages/sub-category-form/sub-category-form.component";
import { SubCategoryResolver } from "./resolvers/sub-category.resolver";
import { EUserType } from "../core/enums/EUserType";
import { authGuard } from "../core/guards/auth.guard";

const routes: Routes = [
  {
    path: 'list',
    component: SubCategoryListComponent,
    data: {
      allowedTypes: [EUserType.User],
    },
    canActivate: [authGuard],
  },
  {
    path: 'create',
    component: SubCategoryFormComponent,
    data: {
      allowedTypes: [EUserType.User],
    },
    canActivate: [authGuard],
  },
  {
    path: 'edit/:id',
    component: SubCategoryFormComponent,
    data: {
      allowedTypes: [EUserType.User],
    },
    canActivate: [authGuard],
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
export class SubCategoryRoutingModule { }

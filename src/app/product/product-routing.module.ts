import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProductListComponent } from "./pages/product-list/product-list.component";
import { ProductFormComponent } from "./pages/product-form/product-form.component";
import { ProductResolver } from "./resolvers/product.resolver";
import { EUserType } from "../core/enums/EUserType";
import { authGuard } from "../core/guards/auth.guard";
import { ProductCardListComponent } from "./pages/product-card-list/product-card-list.component";
import { ProductDetailsComponent } from "./pages/product-details/product-details.component";

const routes: Routes = [
  {
    path: 'list',
    component: ProductListComponent,
    data: {
      allowedTypes: [EUserType.User, EUserType.Client],
    },
    canActivate: [authGuard],
  },
  {
    path: 'create',
    component: ProductFormComponent,
    data: {
      allowedTypes: [EUserType.User],
    },
    canActivate: [authGuard],
  },
  {
    path: 'edit/:id',
    component: ProductFormComponent,
    data: {
      allowedTypes: [EUserType.User],
    },
    canActivate: [authGuard],
    resolve: {
      product: ProductResolver
    }
  },
  {
    path: 'card-list',
    component: ProductCardListComponent,
    data: {
      allowedTypes: [EUserType.User, EUserType.Client],
    },
    canActivate: [authGuard],
  },
  {
    path: 'view/:id',
    component: ProductDetailsComponent,
    data: {
      allowedTypes: [EUserType.User, EUserType.Client],
    },
    canActivate: [authGuard],
    resolve: {
      product: ProductResolver
    }
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ProductRoutingModule { }
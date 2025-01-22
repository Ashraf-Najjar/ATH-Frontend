import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProductListComponent } from "./pages/product-list/product-list.component";
import { ProductFormComponent } from "./pages/product-form/product-form.component";
import { ProductResolver } from "./resolvers/product.resolver";

const routes: Routes = [
    {
      path: 'list',
      component: ProductListComponent,
    },
    {
      path: 'create',
      component: ProductFormComponent,
    },
    {
      path: 'edit/:id',
      component: ProductFormComponent,
      resolve: {
        product: ProductResolver
      }
    }
  ]
  
  @NgModule({
      imports: [RouterModule.forChild(routes)],
      exports: [RouterModule],
      providers: []
    })
  export class ProductRoutingModule{}
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UserListComponent } from "./pages/user-list/user-list.component";
import { UserFormComponent } from "./pages/user-form/user-form.component";
import { UserResolver } from "./reolvers/user.resolver";
import { EUserType } from "../core/enums/EUserType";
import { authGuard } from "../core/guards/auth.guard";
import { UserDetailsComponent } from "./pages/user-details/user-details.component";

const routes: Routes = [
  {
    path: 'list',
    component: UserListComponent,
    data: {
      allowedTypes: [EUserType.User],
    },
    canActivate: [authGuard],
  },
  {
    path: 'create',
    component: UserFormComponent,
    data: {
      allowedTypes: [EUserType.User],
    },
    canActivate: [authGuard],
  },
  {
    path: 'edit/:id',
    component: UserFormComponent,
    data: {
      allowedTypes: [EUserType.User],
    },
    canActivate: [authGuard],
    resolve: {
      user: UserResolver
    }
  },
  {
    path: 'view/:id',
    component: UserDetailsComponent,
    data: {
      allowedTypes: [EUserType.User, EUserType.Client],
    },
    canActivate: [authGuard],
    resolve: {
      user: UserResolver
    }
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class UserRoutingModule { }
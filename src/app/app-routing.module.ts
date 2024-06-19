import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { SidenavComponent } from './layout/sidenav/sidenav.component';

const routes: Routes = [
  {
    path: '',
    component: SidenavComponent,
    // canActivate: [AuthGuard],
    children: [
      { path: "user", loadChildren: () => UserModule },
      { path: "category", loadChildren: () => CategoryModule },
    ]
  }
  // { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  // { path: 'dashboard', pathMatch: 'full', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

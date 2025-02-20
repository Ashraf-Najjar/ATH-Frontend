import { Component, Input, computed, signal } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { EUserType } from 'src/app/core/enums/EUserType';
import { IUser } from 'src/app/user/interfaces/user.interface';

export type MenuItem = {
  icon: string;
  label: string;
  route: string;
  userMode?: boolean;
}
@Component({
  selector: 'app-custom-sidenav',
  templateUrl: './custom-sidenav.component.html',
  styleUrls: ['./custom-sidenav.component.scss']
})


export class CustomSidenavComponent {

  sideNavCollapsed = signal(false);
  @Input() set collapsed (val: boolean) {
    this.sideNavCollapsed.set(val);
  }

  profilePicSize = computed(() => this.sideNavCollapsed() ? '32' : '100');

  menuItems = signal<MenuItem[]>([
    {
      icon: 'group',
      label: 'Users',
      route: 'user/list',
      userMode: true,
      
    },
    {
      icon: 'category',
      label: 'Categories',
      route: 'category/list',
      userMode: true,
    },
    {
      icon: 'category_search',
      label: 'Sub category',
      route: 'sub-category/list',
      userMode: true,
    },
    {
      icon: 'inventory',
      label: 'Products',
      route: 'product/list',
      userMode: true
    },
    {
      icon: 'inventory',
      label: 'Products',
      route: 'product/card-list'
    }
  ]);


  user!: IUser | undefined;
  constructor(private authService: AuthService){
    this.user = this.authService.getUser();
  }

// Filter menu items based on user role
filteredMenuItems = computed(() => {
  if(this.user?.role?.toUpperCase() === EUserType.User) return this.menuItems();
  return this.menuItems().filter(item => !item.userMode)
}
);
}

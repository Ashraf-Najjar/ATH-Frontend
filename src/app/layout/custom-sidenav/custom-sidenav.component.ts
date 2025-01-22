import { Component, Input, computed, signal } from '@angular/core';

export type MenuItem = {
  icon: string;
  label: string;
  route: string;
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
      route: 'user/list'
    },
    {
      icon: 'category',
      label: 'Categories',
      route: 'category/list'
    },
    {
      icon: 'category_search',
      label: 'Sub category',
      route: 'sub-category/list'
    },
    {
      icon: 'inventory',
      label: 'Products',
      route: 'product/list'
    }
  ]);
}

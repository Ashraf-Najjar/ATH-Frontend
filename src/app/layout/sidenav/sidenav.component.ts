import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  collapsed = signal(false);
  sidenavWidth = computed(() => this.collapsed() ? "65px" : "250px")
}

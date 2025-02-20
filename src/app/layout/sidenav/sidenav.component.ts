import { Component, computed, signal } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  collapsed = signal(false);
  sidenavWidth = computed(() => this.collapsed() ? "65px" : "250px")

  constructor(private authService: AuthService){}


  viewProfile(){
    this.authService.logout();
  }

  logout(){
    this.authService.logout();
  }
}

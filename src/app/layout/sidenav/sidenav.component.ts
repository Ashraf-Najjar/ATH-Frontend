import { Component, computed, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  collapsed = signal(false);
  sidenavWidth = computed(() => this.collapsed() ? "65px" : "250px")

  constructor(
    private router: Router,
    private authService: AuthService
  ){}


  viewProfile(){
    this.router.navigate(["/user/view", this.authService.getUser()?._id]);
  }

  logout(){
    this.authService.logout();
  }
}

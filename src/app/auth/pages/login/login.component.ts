import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private router: Router,
    private authService: AuthService
  ){}

  submit() {
    this.authService.login(this.form.value).subscribe({
      next: (res) => {
        if(!res.success) return;
        this.router.navigate(["/"])
      },
      error: (error) => {console.log("error in here ", error)} 
    });
  }
}

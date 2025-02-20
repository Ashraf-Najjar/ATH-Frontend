import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  form: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    phone: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private router: Router,
    private authService: AuthService
  ){}

  submit() {
    this.authService.signup(this.form.value).subscribe({
      next: (res) => {
        console.log("resss ", res)
        if(!res.success) return;
        this.router.navigate(["/"])
      },
      error: (error) => {console.log("error in here ", error)} 
    });
  }
}

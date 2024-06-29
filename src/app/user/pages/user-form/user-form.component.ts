import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  
  formGroup!: FormGroup;
  isLoading = false;

  constructor(
    private userService: UserService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.initForm();
  }
  initForm(){
    this.formGroup = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl('')
    })

  }
  getErrorMessage() {
    if (this.formGroup.controls['email'].hasError('required')) {
      return 'You must enter a value';
    }

    return this.formGroup.controls['email'].hasError('email') ? 'Not a valid email' : '';
  }

  create(){
      if (this.formGroup.invalid) {
        return;
      }
      this.isLoading = true;
      this.userService.createUser(this.formGroup.value).subscribe((res: any) => {
        console.log(res)
        this.router.navigate(["/user/list"]);
      })
      // if (this.mode === "create") {
      //   this.violationApiService.addViolation(this.formGroup.value);
      // } else {
      //   this.violationApiService.updateViolation(this.violation._id, this.formGroup.value);
      // }
      // this.formGroup.reset();
    // }
  }
}

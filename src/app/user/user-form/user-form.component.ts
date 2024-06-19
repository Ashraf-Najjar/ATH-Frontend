import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  
  formGroup!: FormGroup;

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
}

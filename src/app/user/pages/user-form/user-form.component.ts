import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserRestService } from '../../services/user-rest.service';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { IUser } from '../../interfaces/user.interface';
import { UserFactoryService } from '../../services/user-factory.service';
import { IUserService } from '../../interfaces/user.service.interface';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit, OnDestroy {

  formGroup!: FormGroup;
  isLoading = false;

  userId!: string;
  userResponse!: IUser;

  unSubscribeAll = new Subject<void>();

  userService: IUserService = this.userFactoryService.getUserService();

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private userFactoryService: UserFactoryService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.userId = this.activeRoute.snapshot.params['id'];
    if(this.userId){
      this.patchUserData();
    }
  }

  patchUserData(){
    this.activeRoute.data.pipe(takeUntil(this.unSubscribeAll)).subscribe({
      next: (res: { [key: string]: Data }) => {
        if (!res) {
          this.handleNavigate();
          return;
        }
        this.userResponse = <IUser>res?.['user'];
        this.formGroup.patchValue(this.userResponse);

      }
    })
  }

  initForm() {
    this.formGroup = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    })

  }


  submitForm() {
    if (this.formGroup.invalid) {
      return;
    }
    this.isLoading = true;
    const formData = this.formGroup.value;
    const request = this.userId
    ? this.userService.updateUser(this.userId, formData)
    : this.userService.createUser(formData);

    request.subscribe({
      next: () => {
        this.isLoading = false;
        this.handleNavigate();
      },
      error: () => {
        console.error('An error occurred:');
        this.isLoading = false; // Stop loading if there's an error
      }
    });
  }

  handleNavigate(){
    this.router.navigate(["/user/list"]);
  }

  ngOnDestroy() {
    this.unSubscribeAll.next();
    this.unSubscribeAll.complete();
  }
}

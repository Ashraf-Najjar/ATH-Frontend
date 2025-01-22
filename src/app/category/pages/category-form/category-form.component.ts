import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { CategoryRestService } from '../../services/category-rest.service';
import { ICategoryService } from '../../interfaces/category-service.interface';
import { CategoryFactoryService } from '../../services/category-factory.service';
import { Subject, takeUntil } from 'rxjs';
import { ICategory } from '../../interfaces/category.interface';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {
  
  formGroup!: FormGroup;
  isLoading = false;

  categoryId!: string;
  categoryResponse!: ICategory;

  unSubscribeAll = new Subject<void>();

  categoryService: ICategoryService = this.categoryFactoryService.getCategoryService();


  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    public categoryFactoryService: CategoryFactoryService,
  ){}

  ngOnInit(): void {
    this.initForm();
    this.categoryId = this.activeRoute.snapshot.params['id'];
    if(this.categoryId){
      this.patchCategoryData();
    }
  }


  patchCategoryData(){
    this.activeRoute.data.pipe(takeUntil(this.unSubscribeAll)).subscribe({
      next: (res: { [key: string]: Data }) => {
        if (!res) {
          this.handleNavigate();
          return;
        }
        this.categoryResponse = <ICategory>res?.['category'];
        this.formGroup.patchValue(this.categoryResponse);

      }
    })
  }

  handleNavigate(){
    this.router.navigate(["/category/list"]);
  }

  initForm(){
    this.formGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
      note: new FormControl(''),
      description: new FormControl('', [Validators.required])
    })

  }

  submitForm(): void {
    if (this.formGroup.invalid) {
      return;
    }
  
    this.isLoading = true;
  
    const formData = this.formGroup.value;
    const request = this.categoryId
      ? this.categoryService.updateCategory(this.categoryId, formData)
      : this.categoryService.createCategory(formData);
  
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
  

  ngOnDestroy() {
    this.unSubscribeAll.next();
    this.unSubscribeAll.complete();
  }
}

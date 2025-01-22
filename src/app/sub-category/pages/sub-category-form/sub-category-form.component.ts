import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { ISubCategoryService } from '../../interfaces/sub-category-service.interface';
import { SubCategoryFactoryService } from '../../services/sub-category-factory.service';
import { Subject, takeUntil } from 'rxjs';
import { ISubCategory } from '../../interfaces/sub-category.interface';
import { ICategoryService } from 'src/app/category/interfaces/category-service.interface';
import { CategoryFactoryService } from 'src/app/category/services/category-factory.service';
import { ICategory } from 'src/app/category/interfaces/category.interface';

@Component({
  selector: 'app-sub-category-form',
  templateUrl: './sub-category-form.component.html',
  styleUrls: ['./sub-category-form.component.scss']
})
export class SubCategoryFormComponent implements OnInit {

  formGroup!: FormGroup;
  isLoading = false;

  subCategoryId!: string;
  subCategoryResponse!: ISubCategory;

  unSubscribeAll = new Subject<void>();

  subCategoryService: ISubCategoryService = this.subCategoryFactoryService.getSubCategoryService();
  categoryService: ICategoryService = this.categoryFactoryService.getCategoryService();
  categories: ICategory[] = [];


  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    public subCategoryFactoryService: SubCategoryFactoryService,
    public categoryFactoryService: CategoryFactoryService
  ){}

  ngOnInit(): void {
    this.getCategoriesOptions();
    this.initForm();
    this.subCategoryId = this.activeRoute.snapshot.params['id'];
    if(this.subCategoryId){
      this.patchSubCategoryData();
    }
  }

  getCategoriesOptions(){
    this.categoryService.getCategories(0, 100).subscribe((result: any) => {
      this.categories = result.categories
    })
  }


  patchSubCategoryData(){
    this.activeRoute.data.pipe(takeUntil(this.unSubscribeAll)).subscribe({
      next: (res: { [key: string]: Data }) => {
        if (!res) {
          this.handleNavigate();
          return;
        }
        this.subCategoryResponse = <ISubCategory>res?.['subCategory'];
        this.formGroup.patchValue(this.subCategoryResponse);

      }
    })
  }

  handleNavigate(){
    this.router.navigate(["/sub-category/list"]);
  }

  initForm(){
    this.formGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
      note: new FormControl(''),
      description: new FormControl('', [Validators.required]),
      category: new FormControl(null, [Validators.required])
    })

  }

  submitForm(): void {
    if (this.formGroup.invalid) {
      return;
    }
  
    this.isLoading = true;
  
    const formData = this.formGroup.value;
    const request = this.subCategoryId
      ? this.subCategoryService.updateSubCategory(this.subCategoryId, formData)
      : this.subCategoryService.createSubCategory(formData);
  
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

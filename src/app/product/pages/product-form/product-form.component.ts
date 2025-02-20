import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IProduct } from '../../interfaces/product.interface';
import { Subject, takeUntil } from 'rxjs';
import { IProductService } from '../../interfaces/product-service.interface';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { ProductFactoryService } from '../../services/product-factory.service';
import { ICategoryService } from 'src/app/category/interfaces/category-service.interface';
import { ICategory } from 'src/app/category/interfaces/category.interface';
import { CategoryFactoryService } from 'src/app/category/services/category-factory.service';
import { FileUploadService } from 'src/app/core/services/file-upload.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { ISubCategoryService } from 'src/app/sub-category/interfaces/sub-category-service.interface';
import { ISubCategory } from 'src/app/sub-category/interfaces/sub-category.interface';
import { SubCategoryFactoryService } from 'src/app/sub-category/services/sub-category-factory.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit, OnDestroy {

  formGroup!: FormGroup;
  isLoading = false;

  productId!: string;
  productResponse!: IProduct;

  unSubscribeAll = new Subject<void>();

  productService: IProductService = this.productFactoryService.getProductService();
    categoryService: ICategoryService = this.categoryFactoryService.getCategoryService();
    categories: ICategory[] = [];

    subCategoryService: ISubCategoryService = this.subCategoryFactoryService.getSubCategoryService();
    subCategories: ISubCategory[] = [];
    subCategoriesOptions: ISubCategory[] = [];

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private productFactoryService: ProductFactoryService,
    public categoryFactoryService: CategoryFactoryService,
    public subCategoryFactoryService: SubCategoryFactoryService
  ) { }

  ngOnInit(): void {
    this.getCategoriesOptions();
    this.getSubCategoriesOptions();
    this.initForm();
    this.productId = this.activeRoute.snapshot.params['id'];
    if(this.productId){
      this.patchProductData();
    }
  }

  getCategoriesOptions(){
    this.categoryService.getCategories(0, 100).subscribe((result: any) => {
      this.categories = result.categories
    })
  }

  getSubCategoriesOptions(){
    this.subCategoryService.getSubCategories(0, 100).subscribe((result: any) => {
      this.subCategories = result.subCategories;
      this.subCategoriesOptions = JSON.parse(JSON.stringify(this.subCategories ?? []));
    })
  }

  selectedCategoryChanged(value: string){
    this.subCategoriesOptions = this.subCategories.filter(subCategory => subCategory?.category?._id?.toString() === value);
    this.formGroup.get('subCategory')?.setValue('');
  }

  patchProductData(){
    this.activeRoute.data.pipe(takeUntil(this.unSubscribeAll)).subscribe({
      next: (res: { [key: string]: Data }) => {
        if (!res) {
          this.handleNavigate();
          return;
        }
        this.productResponse = <IProduct>res?.['product'];
        this.formGroup.patchValue(this.productResponse);
        this.formGroup.get('category')?.patchValue((this.productResponse?.category as ICategory)?._id ?? this.productResponse?.category);
        this.formGroup.get('subCategory')?.patchValue((this.productResponse?.subCategory as ISubCategory)?._id ?? this.productResponse?.subCategory);

      }
    })
  }

  initForm() {
    this.formGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      subCategory: new FormControl('', [Validators.required]),
      note: new FormControl('', [Validators.required]),
      quantity: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      description: new FormControl('', [Validators.required]),
      image: new FormControl('')
    })
  }

  btnClicked(){
    console.log(this.formGroup.value)
  }


  submitForm() {
    if (this.formGroup.invalid) {
      return;
    }
    this.isLoading = true;
    const formData = this.formGroup.value;
    const request = this.productId
    ? this.productService.updateProduct(this.productId, formData)
    : this.productService.createProduct(formData);

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
    this.router.navigate(["/product/list"]);
  }

  ngOnDestroy() {
    this.unSubscribeAll.next();
    this.unSubscribeAll.complete();
  }
}

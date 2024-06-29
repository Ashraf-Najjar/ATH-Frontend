import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {
  
  formGroup!: FormGroup;
  isLoading = false;

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.initForm();
  }
  initForm(){
    this.formGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
      note: new FormControl(''),
      description: new FormControl('', [Validators.required])
    })

  }

  create(){
      if (this.formGroup.invalid) {
        return;
      }
      this.isLoading = true;
      this.categoryService.createCategory(this.formGroup.value).subscribe((res: any) => {
        this.router.navigate(["/category/list"]);
      });
  }
}

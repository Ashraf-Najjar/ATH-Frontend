import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatMenuTrigger } from '@angular/material/menu';
import { removeEmptyValues, transformObject } from 'src/app/core/helpers/object.helper';

export interface IFilter {
  key: string,
  label: string,
  type: 'text' | 'switch' | 'dropdown',
  options?: any,
  icon?: string,
  placeholder?: string,
  defaultValue?: any,
  validation?: Validators,
  errorMsg?: string
}

export interface IFilterOutput {
    field: string;
    value: any;
}
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})

export class FilterComponent implements OnInit, OnChanges {

  @Input() config!: IFilter[];
  @Input() title!: string;
  @Output() filtersChanged = new EventEmitter<IFilterOutput[]>();

  @ViewChild('menuTrigger') menuTrigger!: MatMenuTrigger;
  
  formGroup: FormGroup = new FormGroup({});
  loading = false;

  constructor(){}
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['config']){
      this.initConfig();
    }
  }
  
  ngOnInit(): void {}


  initForm() {
    this.formGroup = new FormGroup({})
}


  async initConfig(){
    if(!(this.config && this.config.length)){
      return;
    }
    this.loading = true;
    for(let item of this.config){
      this.formGroup.addControl(item.key, new FormControl(item.defaultValue, item?.validation || null));
      if(typeof item.options === "function"){
        item.options = await item.options();
      }
    }

    this.loading = false;
  }

  applyFilter(reset = false){
    if(reset){
      this.formGroup.reset();
    }
    this.menuTrigger.closeMenu()
  }

  menuClosed(){
    let formGroupValue = this.formGroup.value;
    formGroupValue = transformObject(removeEmptyValues(formGroupValue));
    this.filtersChanged.emit(formGroupValue);
  }

  menuOpened(){}
}

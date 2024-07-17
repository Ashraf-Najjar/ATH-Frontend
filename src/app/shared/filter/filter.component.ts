import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})

export class FilterComponent implements OnInit, OnChanges {

  @Input() config!: IFilter[];

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
}

import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input, NgModule, OnInit } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { NgPipesModule } from 'ngx-pipes';

@Component({
  selector: 'absselect',
  templateUrl: './absselect.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AbsselectComponent),
      multi: true,
    },
  ],
})
export class AbsselectComponent implements OnInit, ControlValueAccessor {
  private ngmodel: any = '';
  dropDownInputModel: string = "";
  dropDownInputValueModel: string;
  searchdata: any;
  searchkey: string[] = [];
  @Input() data: any[] = [];
  @Input() lable: string = "name";
  @Input() drpvalue: string = "id";

  //Get Value for Ng Model
  writeValue(value: any) {
    if (value !== this.ngmodel) {
      this.ngmodel = value;
    }
  }
  //Get Value for Ng Model
  registerOnChange(fn: any) {
  }
  //From ControlValueAccessor interface
  registerOnTouched(fn: any) {
  }


  constructor() { }

  ngOnInit(): void {
    debugger
    var gg = this.ngmodel;
    this.searchkey.push(this.lable);
    this.selectValue(this.data[0]);
  }

  selectValue(item) {
    this.dropDownInputModel = item[this.lable];
    this.dropDownInputValueModel = item[this.drpvalue]
  }
}


@NgModule({
  declarations: [AbsselectComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgPipesModule
  ],
  exports: [AbsselectComponent]
})
export class AbsselectModule { }

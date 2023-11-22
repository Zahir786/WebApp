import { CommonModule } from '@angular/common';
import { Component, OnInit, Input, NgModule } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html'
})
export class ValidationComponent implements OnInit {

  @Input() public MessageArray: any[];

  @Input() public propertyName: string;

  @Input() public FormGroupName: UntypedFormGroup;
  constructor() { }

  ngOnInit() { }
  GetMessageArray() {
    return this.MessageArray[this.propertyName];
  }
  CheckValidation(validation: any) {
    // debugger
    // if (this.FormGroupName.get(this.propertyName).touched || this.FormGroupName.get(this.propertyName).dirty) {
    //   return (this.FormGroupName.get(this.propertyName).status == "VALID" && this.FormGroupName.get(this.propertyName).value) ? 'is-valid' : (this.FormGroupName.get(this.propertyName).status == "INVALID") ? 'is-invalid' : '';
    // }
    return this.FormGroupName.get(this.propertyName).hasError(validation.type) && (this.FormGroupName.get(this.propertyName).dirty || this.FormGroupName.get(this.propertyName).touched)
  }

}
@NgModule({
  declarations: [ValidationComponent],
  imports: [
    CommonModule
  ],
  exports: [ValidationComponent]
})
export class ValidationModule { }

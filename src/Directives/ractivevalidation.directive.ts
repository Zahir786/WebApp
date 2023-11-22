import { Directive, ElementRef, EventEmitter,  Output, ViewChildren } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, Validators } from '@angular/forms';
@Directive({
  selector: '[appRactivevalidation]'
})
export class RactivevalidationDirective {
  @Output() fromgroup: EventEmitter<any> = new EventEmitter();
  constructor(
    private formbuilder: UntypedFormBuilder,
    private el: ElementRef
  ) {
    this.GenerateFormValidation();
  }

  GenerateFormValidation() {
    debugger
    var ad = this.el.nativeElement.childNodes;
    let Form: UntypedFormBuilder = this.formbuilder;
    Form.group({ name: new UntypedFormControl('', Validators.compose([Validators.required])) });
    this.fromgroup.emit(Form);
  }
}

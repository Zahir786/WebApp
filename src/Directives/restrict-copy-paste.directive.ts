import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appRestrictCopyPaste]'
})
export class RestrictCopyPasteDirective {

  constructor() { }

  @HostListener('copy', ['$event']) @HostListener('paste', ['$event']) onMouseEnter(eve) {
   eve.preventDefault()
  }


}

import { AfterViewInit, Directive, ElementRef } from '@angular/core';
declare var BVSelect : any;
@Directive({
  selector: '[appSelect2]'
})
export class Select2Directive implements AfterViewInit {
  constructor(
    private el : ElementRef
  ) {
  }
  ngAfterViewInit() {
    var demo1 = new BVSelect({
      selector: "#" + this.el.nativeElement.id,
      searchbox: true
    });
  }

}

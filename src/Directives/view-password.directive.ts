import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appViewPassword]'
})
export class ViewPasswordDirective {

  constructor() { }

  @HostListener('click', ['$event']) viewPassword(eve) {
    let viewPasswordBtn = eve.currentTarget;
    let passwwordIp = eve.currentTarget.previousElementSibling;
    passwwordIp.type == "text" ? passwwordIp.type = "password":passwwordIp.type = "text";
    passwwordIp.type == "text" ? viewPasswordBtn.classList.add('show'):viewPasswordBtn.classList.remove('show');
  }


}

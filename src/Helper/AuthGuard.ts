import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CommonHelper } from './CommonHelper';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private helper: CommonHelper
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.helper.GetUserInfo()?.id > 0) {
            return true;
    }
    else {
      this.router.navigate(['/Login']);
      return false;
    }
  }
}

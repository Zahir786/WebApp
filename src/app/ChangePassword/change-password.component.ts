import { Component, OnInit, NgModule } from '@angular/core';
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ModuleData } from 'src/Helper/Modules';
import { CommonHelper } from 'src/Helper/CommonHelper';
import { CommonService } from 'src/Service/Common.service';
import { NgOtpInputModule } from 'ng-otp-input';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
})
export class ChangePasswordComponent implements OnInit {
  User: any = {};
  constructor(
    private helper: CommonHelper,
    private service: CommonService,
    private activatedRoute: ActivatedRoute,
  ) {
    document.body.classList.add("authentication-bg","authentication-bg-pattern");
   }
  ngOnInit() {
    this.User['user_id']=  this.helper.Decrypt(this.activatedRoute.snapshot.params["id"]);
  }

  async ChangePassword() {
    this.helper.ShowSpinner();
    let res = await this.service.CommonPost({'email': this.helper.GetUserInfo().email,'user_id':this.User.user_id, 'password': this.User.old_password, 'new_password': this.User.confirmPassword}, 'ChangePassword');
    if (res['Type'] == "S") {
      this.helper.SucessToastr(res['Message']);
      this.helper.redirectTo("Login");
    } else {
      this.helper.ErrorToastr(res['Message']);
    }
    this.helper.HideSpinner();
  }

}

const routes: Routes = [
  { path: "", component: ChangePasswordComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChangePasswordRoutingModule { }

@NgModule({
  declarations: [ChangePasswordComponent],
  imports: [
    CommonModule,
    ChangePasswordRoutingModule,
    ModuleData,
    NgOtpInputModule
  ]
})
export class ChangePasswordModule { }

import { Component, OnInit, NgModule } from '@angular/core';
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ModuleData } from 'src/Helper/Modules';
import { CommonHelper } from 'src/Helper/CommonHelper';
import { CommonService } from 'src/Service/Common.service';
import { NgOtpInputModule } from 'ng-otp-input';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent implements OnInit {
  User: any = {};
  otpConfig: any = {
    length: 6,
    inputClass: 'Otp-ip-custom-class',
    allowNumbersOnly: true,
    disableAutoFocus: true,
    placeholder: '*'
  };
  otp: string = "";
  otpIpTouched:boolean = false;
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

  async resetPassword() {
    this.helper.ShowSpinner();
    let res = await this.service.CommonPost(this.User, 'ResetPassword');
    if (res['Type'] == "S") {
      this.helper.SucessToastr(res['Message']);
      this.helper.redirectTo("Login");
    } else {
      this.helper.ErrorToastr(res['Message']);

    }
    this.helper.HideSpinner();
  }

  onOtpChange(eve) {
    this.otpIpTouched = true;
    this.otp = eve;
    this.User['temp_password']= eve;
  }

}

const routes: Routes = [
  { path: "", component: ResetPasswordComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResetPasswordRoutingModule { }

@NgModule({
  declarations: [ResetPasswordComponent],
  imports: [
    CommonModule,
    ResetPasswordRoutingModule,
    ModuleData,
    NgOtpInputModule
  ]
})
export class ResetPasswordModule { }

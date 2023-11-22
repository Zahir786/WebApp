import { Component, OnInit, NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ModuleData } from 'src/Helper/Modules';
import { CommonHelper } from 'src/Helper/CommonHelper';
import { CommonService } from 'src/Service/Common.service';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent implements OnInit {
  User: any = {};
  forgotPasswordEmail:string;
  constructor(
    private helper: CommonHelper,
    private service: CommonService
  ) {
    document.body.classList.add("authentication-bg","authentication-bg-pattern");
   }
  ngOnInit() {
  }

  async getPassword() {
    this.helper.ShowSpinner();
    let res = await this.service.CommonPost({'email': this.forgotPasswordEmail}, 'ForgetPassword');
    if (res['Type'] == "S") {
      this.helper.SucessToastr(res['Message']);
      this.helper.redirectTo("ResetPassword/" + this.helper.Encrypt(res['id']));
    } else {
      this.helper.ErrorToastr(res['Message']);
    }
    this.helper.HideSpinner();
  }

}

const routes: Routes = [
  { path: "", component: ForgotPasswordComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForgotPasswordRoutingModule { }

@NgModule({
  declarations: [ForgotPasswordComponent],
  imports: [
    CommonModule,
    ForgotPasswordRoutingModule,
    ModuleData
  ]
})
export class ForgotPasswordModule { }

import { Component, OnInit, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ModuleData } from 'src/Helper/Modules';
import { CommonHelper } from 'src/Helper/CommonHelper';
import { CommonService } from 'src/Service/Common.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  User: any = {};
  constructor(
    private helper: CommonHelper,
    private service: CommonService,

  ) {
    // document.body.classList.add("authentication-bg","authentication-bg-pattern");
  }
  ngOnInit() {

  }

  viewPassword(eve) {
    let viewPasswordBtn = eve.currentTarget;
    let passwwordIp = eve.currentTarget.previousElementSibling;
    passwwordIp.type == "text" ? passwwordIp.type = "password" : passwwordIp.type = "text";
    passwwordIp.type == "text" ? viewPasswordBtn.classList.add('show') : viewPasswordBtn.classList.remove('show');
  }



  async Login() {
    debugger
    this.helper.ShowSpinner();
    this.helper.DeleteAllLocalStorage();
    let res = await this.service.CommonPost(this.User, "UserLogin");
    if (res['Type'] == "S") {
      this.helper.SucessToastr(res['Message']);
      this.helper.SetLocalStorage(this.helper.StorageName, res['AdditionalData'].User);
      if (this.helper.GetUserInfo().user_role_id == 3) {
        this.helper.RefreshredirectTo("ClientQuestion/" + this.helper.Encrypt('0'));
      }
      else if (this.helper.GetUserInfo().user_role_id == 4) {
        this.helper.RefreshredirectTo("ManagementDashboard");
      }
      else {
        this.helper.redirectTo("Dashboard");
      }

    }
    else if (res['Type'] == "G") {
      this.helper.SucessToastr(res['Message']);
      this.helper.redirectTo("TwoFactorAuthentication/" + this.helper.Encrypt(res['id']));
    }
    else {
      this.helper.ErrorToastr(res['Message']);
    }
    this.helper.HideSpinner();
  }

}

const routes: Routes = [
  { path: "", component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ModuleData,
  ]
})
export class LoginModule { }

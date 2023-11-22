import { Component, OnInit, NgModule } from '@angular/core';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CommonService } from 'src/Service/Common.service';
import { CommonHelper } from 'src/Helper/CommonHelper';
import { ModuleData } from 'src/Helper/Modules';
import { CheckboxModule } from 'primeng/checkbox';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { MultiSelectModule } from 'primeng/multiselect';
import { KeyFilterModule } from 'primeng/keyfilter';
import { TooltipModule } from 'primeng/tooltip';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
})
export class UserComponent implements OnInit {
  UserData: any = {};
  UserForm: FormGroup;
  UserId: number = 0;
  UserRoledropdown: any = {};
  packagePlanList: [];
  nameRegex: RegExp = /^[a-zA-Z \s]*$/;
  mobileRegex: RegExp = /^[\d \+]$/;
  constructor(
    private service: CommonService,
    public helper: CommonHelper,
    private route: ActivatedRoute,
    public commonservice: CommonService,
    private formbuilder: FormBuilder
  ) { }
  async ngOnInit() {
    this.UserId = Number(this.helper.Decrypt(this.route.snapshot.params["id"]));
    this.UserForm = this.formbuilder.group({
      user_role_id: new FormControl('', Validators.compose([Validators.required])),
      first_name: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
      last_name: new FormControl('', Validators.compose([Validators.nullValidator])),
      password: new FormControl('', Validators.compose([Validators.nullValidator, Validators.minLength(3)])),
      email: new FormControl('', Validators.compose([Validators.nullValidator])),
      mobile: new FormControl('', Validators.compose([Validators.nullValidator])),
    });

    this.helper.ShowSpinner();
    await this.GetUserData();
    await this.UserRoledropdownList();
    this.helper.HideSpinner();
  }
  // Email Setup Form Control
  get fc() {
    return this.UserForm.controls
  }
  //

  getValClass(ip) {
    if (ip.touched || ip.dirty) {
      return (ip.status == "VALID" && ip.value) ? 'is-valid' : (ip.status == "INVALID") ? 'is-invalid' : '';
    }
  }
  UserValidationMessages = {
    'first_name': [{ type: 'required', message: 'Enter First Name.' }, { type: 'minlength', message: "First name Should be Minimum 3 Characters." }],
    'password': [{ type: 'minlength', message: "Middle name Should be Minimum 3 Characters." }],
    // 'last_name': [{ type: 'required', message: 'Enter Last Name.' }, { type: 'minlength', message: "Last name Should be Minimum 3 Characters." }],
    // 'email': [{ type: 'required', message: 'Enter Email.' }, { type: 'email', message: "Enter valid Email." }],
    // 'mobile': [{ type: 'required', message: 'Enter Mobile Number.' }, { type: 'minlength', message: 'Enter Mobile Number with Country Code.' }, { type: 'maxlength', message: 'Enter Mobile Number with Country Code.' }],
    // 'password': [{ type: 'required', message: 'Enter Password.' },],
  };
  async GetUserData() {
    if (this.UserId > 0) {
      this.UserData = await this.service.GetById(this.UserId, "UserById");
      // this.UserData.mobile = this.UserData.mobile.substring(1);
    }


  }


  async UserRoledropdownList() {
    this.UserRoledropdown = [];
    let res = await this.service.GetAll("UserRoleList");
    this.UserRoledropdown = res;
    // this.UserRoledropdown = res.filter(obj => ['2', '3'].includes(obj.id));
    if (this.UserId == 0 && this.UserRoledropdown.length > 0) {
      this.UserData.user_role_id = this.UserRoledropdown[0].id;
    }
  }

  async Save() {
    if (this.UserForm.valid == true) {
      let res: any;
      this.helper.ShowSpinner();
      if (this.UserId > 0) {
        // this.UserData.mobile = "+" + this.UserData.mobile;
        res = await this.service.CommonPost(this.UserData, "UserUpdate");
      }
      else {
        res = await this.service.CommonPost(this.UserData, "UserInsert");
      }
      if (res.Type == "S") {
        this.helper.SucessToastr(res.Message);
        this.helper.redirectTo("UserList");
      }
      else {
        this.helper.ErrorToastr(res.Message);
      }
      this.helper.HideSpinner();
    }
    else {
      this.helper.validateAllFormFields(this.UserForm);
    }
  }

  ViewUserPassword(eve: any) {
    let viewPasswordBtn = eve.currentTarget;
    let passwwordIp = eve.currentTarget.previousElementSibling;
    passwwordIp.type == "text" ? passwwordIp.type = "password" : passwwordIp.type = "text";
    passwwordIp.type == "text" ? viewPasswordBtn.classList.add('show') : viewPasswordBtn.classList.remove('show');
  }
}
const routes: Routes = [
  { path: "", component: UserComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }

@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    ModuleData,
    UserRoutingModule,
    CheckboxModule,
    DropdownModule,
    InputMaskModule,
    MultiSelectModule,
    KeyFilterModule,
    TooltipModule

  ]
})
export class UserModule { }

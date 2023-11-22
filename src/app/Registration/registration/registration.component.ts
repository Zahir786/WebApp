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
import { KeyFilterModule } from 'primeng/keyfilter';
import { TooltipModule } from 'primeng/tooltip';
import { InputSwitchModule } from 'primeng/inputswitch';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
})
export class RegistrationComponent implements OnInit {
  registrationData: any = {};
  registrationForm: FormGroup;
  registrationId: number = 0;
  Statedropdown: any = {};
  MaritusStatusdropdown: any = {};
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
    this.registrationId = Number(this.helper.Decrypt(this.route.snapshot.params["id"]));
    this.registrationForm = this.formbuilder.group({
      first_name: new FormControl('', Validators.compose([Validators.required])),
      last_name: new FormControl('', Validators.compose([Validators.required])),
      email: new FormControl('', Validators.compose([Validators.required])),
      phone_no: new FormControl('', Validators.compose([Validators.required])),
      subject: new FormControl('', Validators.compose([Validators.nullValidator])),
      marital_status: new FormControl('', Validators.compose([Validators.nullValidator])),
      date_of_birth: new FormControl('', Validators.compose([Validators.nullValidator])),
      address: new FormControl('', Validators.compose([Validators.nullValidator])),
      state_id: new FormControl('', Validators.compose([Validators.nullValidator])),
      zip_code: new FormControl('', Validators.compose([Validators.nullValidator])),
    });

    this.helper.ShowSpinner();
    await this.GetregistrationData();
    await this.StatedropdownList();
    await this.MaritusStatusdropdownList();
    this.helper.HideSpinner();
  }
  // Email Setup Form Control
  get fc() {
    return this.registrationForm.controls
  }
  //

  getValClass(ip) {
    if (ip.touched || ip.dirty) {
      return (ip.status == "VALID" && ip.value) ? 'is-valid' : (ip.status == "INVALID") ? 'is-invalid' : '';
    }
  }



  registrationValidationMessages = {
    'first_name': [{ type: 'required', message: 'Enter name.' }],
    'last_name': [{ type: 'required', message: 'Enter name.' }],
    'email': [{ type: 'required', message: 'Enter email.' }],
    'phone_no': [{ type: 'required', message: 'Enter phone no.' }],
  };
  async GetregistrationData() {
    if (this.registrationId > 0) {
      this.registrationData = await this.service.GetById(this.registrationId, "RegistrationById");
    }
  }

  async StatedropdownList() {
    this.Statedropdown = [];
    let res = await this.service.GetAll("StateList");
    this.Statedropdown = res;
    // this.UserRoledropdown = res.filter(obj => ['2', '3'].includes(obj.id));
    if (this.registrationId == 0 && this.Statedropdown.length > 0) {
      this.registrationData.state_id = this.Statedropdown[0].id;
    }
  }

  async MaritusStatusdropdownList() {
    this.MaritusStatusdropdown = [];
    this.MaritusStatusdropdown.push({ id: 1, name: 'Married' },
      { id: 2, name: 'UnMarried' });
    // this.UserRoledropdown = res.filter(obj => ['2', '3'].includes(obj.id));
    if (this.registrationId == 0 && this.Statedropdown.length > 0) {
      this.registrationData.marital_status = this.Statedropdown[0].id;
    }
  }

  async Save() {
    if (this.registrationForm.valid == true) {
      let res: any;
      this.helper.ShowSpinner();
      if (this.registrationId > 0) {
        res = await this.service.CommonPost(this.registrationData, "RegistrationUpdate");
      }
      else {
        console.log(this.registrationData);
        res = await this.service.CommonPost(this.registrationData, "RegistrationInsert");
      }
      if (res.Type == "S") {
        this.helper.SucessToastr(res.Message);
        this.helper.redirectTo("RegistrationList");
      }
      else {
        this.helper.ErrorToastr(res.Message);
      }
      this.helper.HideSpinner();
    }
    else {
      this.helper.validateAllFormFields(this.registrationForm);
    }
  }


}
const routes: Routes = [
  { path: "", component: RegistrationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrationRoutingModule { }

@NgModule({
  declarations: [RegistrationComponent],
  imports: [
    CommonModule,
    ModuleData,
    RegistrationRoutingModule,
    CheckboxModule,
    DropdownModule,
    InputMaskModule,
    KeyFilterModule,
    TooltipModule,
    InputSwitchModule

  ]
})
export class RegistrationModule { }

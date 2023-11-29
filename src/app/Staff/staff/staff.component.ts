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
  selector: 'app-staff',
  templateUrl: './staff.component.html',
})
export class StaffComponent implements OnInit {
  staffData: any = {};
  staffForm: FormGroup;
  staffId: number = 0;
  Categorydropdown: any = {};
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
    this.staffId = Number(this.helper.Decrypt(this.route.snapshot.params["id"]));
    this.staffForm = this.formbuilder.group({
      name: new FormControl('', Validators.compose([Validators.required])),
      email: new FormControl('', Validators.compose([Validators.required])),
      mobile_no: new FormControl('', Validators.compose([Validators.required])),
      address: new FormControl('', Validators.compose([Validators.nullValidator])),
    });

    this.helper.ShowSpinner();
    await this.GetstaffData();
    this.helper.HideSpinner();
  }
  // Email Setup Form Control
  get fc() {
    return this.staffForm.controls
  }
  //

  getValClass(ip) {
    if (ip.touched || ip.dirty) {
      return (ip.status == "VALID" && ip.value) ? 'is-valid' : (ip.status == "INVALID") ? 'is-invalid' : '';
    }
  }
  staffValidationMessages = {
    'name': [{ type: 'required', message: 'Enter name.' }],
    'email': [{ type: 'required', message: 'Enter email.' }],
    'phone_no': [{ type: 'required', message: 'Enter phone no.' }],
  };
  async GetstaffData() {
    if (this.staffId > 0) {
      this.staffData = await this.service.GetById(this.staffId, "StaffById");
    }
  }

  async Save() {
    if (this.staffForm.valid == true) {
      let res: any;
      this.helper.ShowSpinner();
      if (this.staffId > 0) {
        res = await this.service.CommonPost(this.staffData, "StaffUpdate");
      }
      else {
        console.log(this.staffData);
        res = await this.service.CommonPost(this.staffData, "StaffInsert");
      }
      console.log(res);
      if (res.Type == "S") {
        this.helper.SucessToastr(res.Message);
        this.helper.redirectTo("StaffList");
      }
      else {
        this.helper.ErrorToastr(res.Message);
      }
      this.helper.HideSpinner();
    }
    else {
      this.helper.validateAllFormFields(this.staffForm);
    }
  }


}
const routes: Routes = [
  { path: "", component: StaffComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRoutingModule { }

@NgModule({
  declarations: [StaffComponent],
  imports: [
    CommonModule,
    ModuleData,
    StaffRoutingModule,
    CheckboxModule,
    DropdownModule,
    InputMaskModule,
    KeyFilterModule,
    TooltipModule,
    InputSwitchModule

  ]
})
export class StaffModule { }

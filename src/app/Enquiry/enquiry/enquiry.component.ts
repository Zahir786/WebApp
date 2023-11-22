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
  selector: 'app-enquiry',
  templateUrl: './enquiry.component.html',
})
export class EnquiryComponent implements OnInit {
  enquiryData: any = {};
  enquiryForm: FormGroup;
  enquiryId: number = 0;
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
    this.enquiryId = Number(this.helper.Decrypt(this.route.snapshot.params["id"]));
    this.enquiryForm = this.formbuilder.group({
      name: new FormControl('', Validators.compose([Validators.required])),
      email: new FormControl('', Validators.compose([Validators.required])),
      phone_no: new FormControl('', Validators.compose([Validators.required])),
      subject: new FormControl('', Validators.compose([Validators.nullValidator])),
      enquiry: new FormControl('', Validators.compose([Validators.nullValidator])),
      message: new FormControl('', Validators.compose([Validators.nullValidator])),
    });

    this.helper.ShowSpinner();
    await this.GetenquiryData();
    this.helper.HideSpinner();
  }
  // Email Setup Form Control
  get fc() {
    return this.enquiryForm.controls
  }
  //

  getValClass(ip) {
    if (ip.touched || ip.dirty) {
      return (ip.status == "VALID" && ip.value) ? 'is-valid' : (ip.status == "INVALID") ? 'is-invalid' : '';
    }
  }
  enquiryValidationMessages = {
    'name': [{ type: 'required', message: 'Enter name.' }],
    'email': [{ type: 'required', message: 'Enter email.' }],
    'phone_no': [{ type: 'required', message: 'Enter phone no.' }],
  };
  async GetenquiryData() {
    if (this.enquiryId > 0) {
      this.enquiryData = await this.service.GetById(this.enquiryId, "EnquiryById");
    }
  }

  async Save() {
    if (this.enquiryForm.valid == true) {
      let res: any;
      this.helper.ShowSpinner();
      if (this.enquiryId > 0) {
        res = await this.service.CommonPost(this.enquiryData, "EnquiryUpdate");
      }
      else {
        console.log(this.enquiryData);
        res = await this.service.CommonPost(this.enquiryData, "EnquiryInsert");
      }
      if (res.Type == "S") {
        this.helper.SucessToastr(res.Message);
        this.helper.redirectTo("enquiryList");
      }
      else {
        this.helper.ErrorToastr(res.Message);
      }
      this.helper.HideSpinner();
    }
    else {
      this.helper.validateAllFormFields(this.enquiryForm);
    }
  }


}
const routes: Routes = [
  { path: "", component: EnquiryComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnquiryRoutingModule { }

@NgModule({
  declarations: [EnquiryComponent],
  imports: [
    CommonModule,
    ModuleData,
    EnquiryRoutingModule,
    CheckboxModule,
    DropdownModule,
    InputMaskModule,
    KeyFilterModule,
    TooltipModule,
    InputSwitchModule

  ]
})
export class EnquiryModule { }

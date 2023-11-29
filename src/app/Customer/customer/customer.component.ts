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
  selector: 'app-customer',
  templateUrl: './customer.component.html',
})
export class CustomerComponent implements OnInit {
  customerData: any = {};
  customerForm: FormGroup;
  customerId: number = 0;
  Statedropdown: any = {};
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
    this.customerId = Number(this.helper.Decrypt(this.route.snapshot.params["id"]));
    this.customerForm = this.formbuilder.group({
      first_name: new FormControl('', Validators.compose([Validators.required])),
      last_name: new FormControl('', Validators.compose([Validators.required])),
      email: new FormControl('', Validators.compose([Validators.required])),
      phone_no: new FormControl('', Validators.compose([Validators.required])),
      subject: new FormControl('', Validators.compose([Validators.nullValidator])),
      date_of_birth: new FormControl('', Validators.compose([Validators.nullValidator])),
      address: new FormControl('', Validators.compose([Validators.nullValidator])),
      state_id: new FormControl('', Validators.compose([Validators.nullValidator])),
      zip_code: new FormControl('', Validators.compose([Validators.nullValidator])),
    });

    this.helper.ShowSpinner();
    await this.GetcustomerData();
    await this.StatedropdownList();
    this.helper.HideSpinner();
  }
  // Email Setup Form Control
  get fc() {
    return this.customerForm.controls
  }
  //

  getValClass(ip) {
    if (ip.touched || ip.dirty) {
      return (ip.status == "VALID" && ip.value) ? 'is-valid' : (ip.status == "INVALID") ? 'is-invalid' : '';
    }
  }



  customerValidationMessages = {
    'first_name': [{ type: 'required', message: 'Enter name.' }],
    'last_name': [{ type: 'required', message: 'Enter name.' }],
    'email': [{ type: 'required', message: 'Enter email.' }],
    'phone_no': [{ type: 'required', message: 'Enter phone no.' }],
  };
  async GetcustomerData() {
    if (this.customerId > 0) {
      this.customerData = await this.service.GetById(this.customerId, "CustomerById");
    }
  }

  async StatedropdownList() {
    this.Statedropdown = [];
    let res = await this.service.GetAll("StateList");
    this.Statedropdown = res;
    // this.UserRoledropdown = res.filter(obj => ['2', '3'].includes(obj.id));
    if (this.customerId == 0 && this.Statedropdown.length > 0) {
      this.customerData.state_id = this.Statedropdown[0].id;
    }
  }



  async Save() {
    if (this.customerForm.valid == true) {
      let res: any;
      this.helper.ShowSpinner();
      if (this.customerId > 0) {
        res = await this.service.CommonPost(this.customerData, "CustomerUpdate");
      }
      else {
        console.log(this.customerData);
        res = await this.service.CommonPost(this.customerData, "CustomerInsert");
      }
      if (res.Type == "S") {
        this.helper.SucessToastr(res.Message);
        this.helper.redirectTo("CustomerList");
      }
      else {
        this.helper.ErrorToastr(res.Message);
      }
      this.helper.HideSpinner();
    }
    else {
      this.helper.validateAllFormFields(this.customerForm);
    }
  }


}
const routes: Routes = [
  { path: "", component: CustomerComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }

@NgModule({
  declarations: [CustomerComponent],
  imports: [
    CommonModule,
    ModuleData,
    CustomerRoutingModule,
    CheckboxModule,
    DropdownModule,
    InputMaskModule,
    KeyFilterModule,
    TooltipModule,
    InputSwitchModule

  ]
})
export class CustomerModule { }

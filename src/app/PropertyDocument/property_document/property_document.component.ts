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
import { CalendarModule } from 'primeng/calendar';
@Component({
  selector: 'app-porperty_document',
  templateUrl: './property_document.component.html',
})
export class PorpertyDocumentComponent implements OnInit {
  PorpertyDocumentData: any = {};
  PorpertyDocumentForm: FormGroup;
  PorpertyDocumentId: number = 0;
  Propertydropdown: any = {};
  Statedropdown: any = {};
  Staffdropdown: any = {};
  Customerdropdown: any = {};
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
    this.PorpertyDocumentId = Number(this.helper.Decrypt(this.route.snapshot.params["id"]));
    this.PorpertyDocumentForm = this.formbuilder.group({
      date: new FormControl('', Validators.compose([Validators.required])),
      document_no: new FormControl('', Validators.compose([Validators.required])),
      customer_id: new FormControl('', Validators.compose([Validators.required])),
      property_id: new FormControl('', Validators.compose([Validators.nullValidator])),
      staff_id: new FormControl('', Validators.compose([Validators.nullValidator])),
      address: new FormControl('', Validators.compose([Validators.nullValidator])),
      state_id: new FormControl('', Validators.compose([Validators.nullValidator])),
      zip_code: new FormControl('', Validators.compose([Validators.nullValidator])),
    });

    this.helper.ShowSpinner();
    await this.CustomerdropdownList();
    await this.PropertydropdownList();
    await this.StaffdropdownList();
    await this.StatedropdownList();
    await this.GetPorpertyDocumentData();
    this.helper.HideSpinner();
  }
  // Email Setup Form Control
  get fc() {
    return this.PorpertyDocumentForm.controls
  }
  //

  getValClass(ip) {
    if (ip.touched || ip.dirty) {
      return (ip.status == "VALID" && ip.value) ? 'is-valid' : (ip.status == "INVALID") ? 'is-invalid' : '';
    }
  }
  PorpertyDocumentValidationMessages = {
    'date': [{ type: 'required', message: 'Enter date.' }],
    'document_no': [{ type: 'required', message: 'Enter document no.' }],
    'customer_id': [{ type: 'required', message: 'Enter customer.' }],
    'property_id': [{ type: 'required', message: 'Enter Property.' }],
    'staff_id': [{ type: 'required', message: 'Enter Property.' }],
    'address': [{ type: 'required', message: 'Enter address.' }],
    'state_id': [{ type: 'required', message: 'Enter state.' }],
    'zip_code': [{ type: 'required', message: 'Enter zip_code.' }],
  };
  async GetPorpertyDocumentData() {
    if (this.PorpertyDocumentId > 0) {
      this.PorpertyDocumentData = await this.service.GetById(this.PorpertyDocumentId, "PropertyDocumentById");
    }
  }

  async CustomerdropdownList() {
    this.Customerdropdown = [];
    let res = await this.service.GetAll("CustomerList");

    this.Customerdropdown = res;
    if (this.PorpertyDocumentId == 0 && this.Customerdropdown.length > 0) {
      console.log(res);
      this.PorpertyDocumentData.customer_id = this.Customerdropdown[0].id;
      console.log(this.PorpertyDocumentData.customer_id);
    }
  }

  async StatedropdownList() {
    this.Statedropdown = [];
    let res = await this.service.GetAll("StateList");
    this.Statedropdown = res;
    if (this.PorpertyDocumentId == 0 && this.Statedropdown.length > 0) {
      this.PorpertyDocumentData.state_id = this.Statedropdown[0].id;
    }
  }

  async StaffdropdownList() {
    this.Staffdropdown = [];
    let res = await this.service.GetAll("StaffList");
    this.Staffdropdown = res;
    if (this.PorpertyDocumentId == 0 && this.Staffdropdown.length > 0) {
      this.PorpertyDocumentData.staff_id = this.Staffdropdown[0].id;
    }
  }

  async PropertydropdownList() {
    this.Propertydropdown = [];
    let res = await this.service.GetAll("PropertyList");
    this.Propertydropdown = res;
    if (this.PorpertyDocumentId == 0 && this.Propertydropdown.length > 0) {
      this.PorpertyDocumentData.property_id = this.Propertydropdown[0].id;
    }
  }

  async Save() {
    console.log(this.PorpertyDocumentData);
    if (this.PorpertyDocumentForm.valid == true) {
      let res: any;
      this.helper.ShowSpinner();
      if (this.PorpertyDocumentId > 0) {
        res = await this.service.CommonPost(this.PorpertyDocumentData, "PropertyDocumentUpdate");
      }
      else {
        console.log(this.PorpertyDocumentData);
        res = await this.service.CommonPost(this.PorpertyDocumentData, "PropertyDocumentInsert");
      }
      if (res.Type == "S") {
        this.helper.SucessToastr(res.Message);
        this.helper.redirectTo("PorpertyDocumentList");
      }
      else {
        this.helper.ErrorToastr(res.Message);
      }
      this.helper.HideSpinner();
    }
    else {
      this.helper.validateAllFormFields(this.PorpertyDocumentForm);
    }
  }


}
const routes: Routes = [
  { path: "", component: PorpertyDocumentComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PorpertyDocumentRoutingModule { }

@NgModule({
  declarations: [PorpertyDocumentComponent],
  imports: [
    CommonModule,
    ModuleData,
    PorpertyDocumentRoutingModule,
    DropdownModule,
    KeyFilterModule,
    DropdownModule,
    CalendarModule
  ]
})
export class PorpertyDocumentModule { }

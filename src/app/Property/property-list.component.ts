import { Component, OnInit, NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CommonService } from 'src/Service/Common.service';
import { CommonHelper } from 'src/Helper/CommonHelper';
import { ModuleData } from 'src/Helper/Modules';
import { TableModule } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';

import { ToastModule } from 'primeng/toast';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
})
export class PropertyListComponent implements OnInit {
  propertyList: any = [];
  Columns: any;
  propertyData: any = {};
  propertyForm: FormGroup;
  propertyDialouge: boolean = false;
  propertyId: number = 0;
  constructor(
    private service: CommonService,
    private helper: CommonHelper,
    private formbuilder: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }
  async ngOnInit() {

    this.Columns = [
      { field: 'name', header: 'Name' },
    ];
    this.helper.ShowSpinner();
    await this.GetpropertyList();

    this.helper.HideSpinner();
  }
  FormValidation() {
    this.propertyForm = this.formbuilder.group({
      name: new FormControl('', Validators.compose([Validators.required])),

    });
  }

  propertyFormValidationMessage = {
    'name': [
      { type: 'required', message: 'Please Provide Name' },
    ],

  };
  async GetpropertyList() {
    this.propertyList = await this.service.GetAll("PropertyList");
  }



  async Edit(id: number) {
    try {
      this.FormValidation();
      if (id == 0) {
        this.propertyData = { id: 0 };
        this.propertyId = 0;
      }
      else {
        this.helper.ShowSpinner();
        this.propertyData = await this.service.GetById(id, "PropertyById");
        console.log(this.propertyData);

        this.propertyId = this.propertyData.id;
        this.helper.HideSpinner();
      }

      this.propertyDialouge = true;
    }
    catch (e) {
      this.helper.HideSpinner();
      this.helper.ErrorToastr(e.message);
    }
  }

  async SaveOrUpdate() {
    try {

      if (this.propertyForm.valid) {
        this.helper.ShowSpinner();
        let res: any;
        this.propertyId = this.propertyData.id;
        if (this.propertyId == 0) {
          res = await this.service.CommonPost(this.propertyData, "PropertyInsert");
        }
        else {
          res = await this.service.CommonPost(this.propertyData, "PropertyUpdate");
        }
        if (res.Type == "S") {
          this.helper.SucessToastr(res.Message);
          this.GetpropertyList();
          this.propertyDialouge = false;
          this.helper.HideSpinner();
        }
        else {
          this.helper.ErrorToastr(res.Message);
          this.helper.HideSpinner();
        }
      }
      else {
        this.helper.validateAllFormFields(this.propertyForm);
        this.helper.HideSpinner();
      }
    }
    catch (e) {
      this.helper.ErrorToastr(e.message);
      this.helper.HideSpinner();
    }

  }

  async Delete(id, name) {
    this.confirmationService.confirm({
      message: `Are you sure that you want to delete <strong>${name}</strong>?`,
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        this.helper.ShowSpinner();
        let res = await this.service.Delete(id, "PropertyDelete");
        if (res['Type'] == "S") {
          this.helper.SucessToastr(res['Message']);
          this.GetpropertyList();
          this.propertyDialouge = false;
        }
        else {
          this.helper.ErrorToastr(res['Message']);
        }
        this.helper.HideSpinner();
      }
    });

  }

}

const routes: Routes = [
  { path: "", component: PropertyListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropertyListRoutingModule { }

@NgModule({
  declarations: [PropertyListComponent],
  imports: [
    CommonModule,
    ModuleData,
    PropertyListRoutingModule,
    TableModule,
    DialogModule,
    DropdownModule
  ],
  providers: []
})
export class PropertyListModule { }

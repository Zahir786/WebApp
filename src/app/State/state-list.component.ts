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
  selector: 'app-state-list',
  templateUrl: './state-list.component.html',
})
export class StateListComponent implements OnInit {
  stateList: any = [];
  Columns: any;
  stateData: any = {};
  stateForm: FormGroup;
  stateDialouge: boolean = false;
  stateId: number = 0;
  CountryDropdown: any = [];
  constructor(
    private service: CommonService,
    private helper: CommonHelper,
    private formbuilder: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }
  async ngOnInit() {

    this.Columns = [
      { field: 'country.name', header: 'Country' },
      { field: 'name', header: 'Name' },
      { field: 'code', header: 'Code' },
    ];
    this.helper.ShowSpinner();
    await this.GetstateList();

    this.helper.HideSpinner();
  }
  FormValidation() {
    this.stateForm = this.formbuilder.group({
      name: new FormControl('', Validators.compose([Validators.required])),
      code: new FormControl('', Validators.compose([Validators.required])),
      country_id: new FormControl('', Validators.compose([Validators.nullValidator])),

    });
  }

  stateFormValidationMessage = {
    'name': [
      { type: 'required', message: 'Please Provide Name' },
    ],
    'code': [
      { type: 'required', message: 'Please Provide Code' },
    ],
    // 'country_id': [
    //   { type: 'required', message: 'Please Provide Code' },
    // ],
  };
  async GetstateList() {
    this.stateList = await this.service.GetAll("StateList");
  }

  async CountryDropdownList() {
    debugger
    this.CountryDropdown = [];
    let res = await this.service.GetAll('CountryList');
    this.CountryDropdown = res;
    // if (this.stateId == 0 && this.CountryDropdown.length > 0) {
    //   this.stateData.country_id = this.CountryDropdown[0].id;
    // }
  }

  async Edit(id: number) {
    try {
      this.FormValidation();
      await this.CountryDropdownList();
      if (id == 0) {
        this.stateData = { id: 0 };
        this.stateId = 0;
      }
      else {
        this.helper.ShowSpinner();
        this.stateData = await this.service.GetById(id, "StateById");
        console.log(this.stateData);

        this.stateId = this.stateData.id;
        this.helper.HideSpinner();
      }

      this.stateDialouge = true;
    }
    catch (e) {
      this.helper.HideSpinner();
      this.helper.ErrorToastr(e.message);
    }
  }

  async SaveOrUpdate() {
    try {

      if (this.stateForm.valid) {
        this.helper.ShowSpinner();
        let res: any;
        this.stateId = this.stateData.id;
        if (this.stateId == 0) {
          res = await this.service.CommonPost(this.stateData, "StateInsert");
        }
        else {
          res = await this.service.CommonPost(this.stateData, "StateUpdate");
        }
        if (res.Type == "S") {
          this.helper.SucessToastr(res.Message);
          this.GetstateList();
          this.stateDialouge = false;
          this.helper.HideSpinner();
        }
        else {
          this.helper.ErrorToastr(res.Message);
          this.helper.HideSpinner();
        }
      }
      else {
        this.helper.validateAllFormFields(this.stateForm);
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
        let res = await this.service.Delete(id, "StateDelete");
        if (res['Type'] == "S") {
          this.helper.SucessToastr(res['Message']);
          this.GetstateList();
          this.stateDialouge = false;
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
  { path: "", component: StateListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StateListRoutingModule { }

@NgModule({
  declarations: [StateListComponent],
  imports: [
    CommonModule,
    ModuleData,
    StateListRoutingModule,
    TableModule,
    DialogModule,
    DropdownModule
  ],
  providers: []
})
export class StateListModule { }

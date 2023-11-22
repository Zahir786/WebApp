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

@Component({
  selector: 'app-user_role-list',
  templateUrl: './user_role-list.component.html',
})
export class UserRoleListComponent implements OnInit {
  UserRoleList: any = [];
  Columns: any;
  UserRoleData: any = {};
  UserRoleForm: FormGroup;
  UserRoleDialouge: boolean = false;
  UserRoleId: number = 0;
  constructor(
    private service: CommonService,
    private helper: CommonHelper,
    private formbuilder: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }
  async ngOnInit() {

    this.Columns = [
      { field: 'name', header: 'User Role' },
    ];
    this.helper.ShowSpinner();
    await this.GetUserRoleList();
    this.helper.HideSpinner();
  }
  FormValidation() {
    this.UserRoleForm = this.formbuilder.group({
      name: new FormControl('', Validators.compose([Validators.required])),
    });
  }

  UserRoleFormValidationMessage = {
    'name': [
      { type: 'required', message: 'Please Provide User Role' },
    ],
  };
  async GetUserRoleList() {
    this.UserRoleList = await this.service.GetAll("UserRoleList");
  }

  async Edit(id: number) {
    try {
      this.FormValidation();
      if (id == 0) {
        this.UserRoleData = { id: 0 };
        this.UserRoleId = 0;
      }
      else {
        this.helper.ShowSpinner();
        this.UserRoleData = await this.service.GetById(id, "UserRoleById");
        this.UserRoleId = this.UserRoleData.id;
        this.helper.HideSpinner();
      }
      this.UserRoleDialouge = true;
    }
    catch (e) {
      this.helper.HideSpinner();
      this.helper.ErrorToastr(e.message);
    }
  }

  async SaveOrUpdate() {
    try {

      if (this.UserRoleForm.valid) {
        this.helper.ShowSpinner();
        let res: any;
        this.UserRoleId = this.UserRoleData.id;
        if (this.UserRoleId == 0) {
          res = await this.service.CommonPost(this.UserRoleData, "UserRoleInsert");
        }
        else {
          res = await this.service.CommonPost(this.UserRoleData, "UserRoleUpdate");
        }
        if (res.Type == "S") {
          this.helper.SucessToastr("User Role Created Successfully");
          this.GetUserRoleList();
          this.UserRoleDialouge = false;
          this.helper.HideSpinner();
        }
        else {
          this.helper.ErrorToastr(res.Message);
          this.helper.HideSpinner();
        }
      }
      else {
        this.helper.validateAllFormFields(this.UserRoleForm);
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
        let res = await this.service.Delete(id, "UserRoleDelete");
        if (res['Type'] == "S") {
          this.helper.SucessToastr(res['Message']);
          this.GetUserRoleList();
          this.UserRoleDialouge = false;
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
  { path: "", component: UserRoleListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoleListRoutingModule { }

@NgModule({
  declarations: [UserRoleListComponent],
  imports: [
    CommonModule,
    ModuleData,
    UserRoleListRoutingModule,
    TableModule,
    DialogModule,
  ],
  providers: []
})
export class UserListModule { }

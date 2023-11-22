import { Component, OnInit, NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CommonService } from 'src/Service/Common.service';
import { CommonHelper } from 'src/Helper/CommonHelper';
import { ModuleData } from 'src/Helper/Modules';
import { TableModule } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
})
export class UserListComponent implements OnInit {
  UserList: any = [];
  User: any = {};
  Columns: any;
  constructor(
    private service: CommonService,
    private helper: CommonHelper,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }
  async ngOnInit() {

    this.Columns = [
      { field: 'user_role.name', header: 'User Role' },
      { field: 'email', header: 'Email' },
      { field: 'first_name', header: 'First Name' },
      { field: 'last_name', header: 'Last Name' },
      { field: 'mobile', header: 'Moblie' },
    ];
    this.helper.ShowSpinner();
    await this.GetUserList();
    this.helper.HideSpinner();
  }
  async GetUserList() {
    this.UserList = await this.service.GetAll("UserList");
    console.log(this.UserList);
  }

  Edit(id) {
    this.helper.redirectTo("User/" + this.helper.Encrypt(id));
  }

  async Delete(id, firstname, lastName) {
    this.confirmationService.confirm({
      message: `Are you sure that you want to delete <strong>${firstname} ${lastName ? lastName : ''}</strong>?`,
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        this.helper.ShowSpinner();
        let res = await this.service.Delete(id, "UserDelete");
        if (res['Type'] == "S") {
          this.helper.SucessToastr(res['Message']);
          this.GetUserList();
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
  { path: "", component: UserListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserListRoutingModule { }

@NgModule({
  declarations: [UserListComponent],
  imports: [
    CommonModule,
    ModuleData,
    UserListRoutingModule,
    TableModule
  ],
  providers: []
})
export class UserListModule { }
